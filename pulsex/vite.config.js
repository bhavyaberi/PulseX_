import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// In-memory rate limiting map
const rateLimitMap = new Map();
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const groqApiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY || '';
    return {
        plugins: [
            react(),
            {
                name: 'pulse-ai-backend',
                configureServer(server) {
                    server.middlewares.use('/api/chat', (req, res) => {
                        if (req.method !== 'POST') {
                            res.statusCode = 405;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
                            return;
                        }
                        // Rate Limit Check (20 requests per minute per IP)
                        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
                        const now = Date.now();
                        const limit = 20;
                        const windowMs = 60 * 1000;
                        let clientData = rateLimitMap.get(ip);
                        if (!clientData || now > clientData.resetTime) {
                            clientData = { count: 0, resetTime: now + windowMs };
                        }
                        clientData.count++;
                        rateLimitMap.set(ip, clientData);
                        if (clientData.count > limit) {
                            res.statusCode = 429;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few moments.' }));
                            return;
                        }
                        // Read request body stream
                        let body = '';
                        req.on('data', chunk => {
                            body += chunk;
                        });
                        req.on('end', async () => {
                            try {
                                const payload = JSON.parse(body || '{}');
                                if (!payload.message || typeof payload.message !== 'string') {
                                    res.statusCode = 400;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.end(JSON.stringify({ error: 'Missing or invalid message parameter.' }));
                                    return;
                                }
                                if (!groqApiKey) {
                                    console.error('Pulse AI backend error: GROQ_API_KEY is not configured in .env file.');
                                    res.statusCode = 500;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.end(JSON.stringify({ error: 'Groq API key not configured on the server.' }));
                                    return;
                                }
                                // Prepare messages for Groq API following the OpenAI specification
                                const messages = [
                                    {
                                        role: 'system',
                                        content: 'You are Pulse AI, a professional fitness and nutrition assistant integrated into PulseX, an intelligent fitness website. In addition to answering fitness, workout, diet, nutrition, recovery, exercise, wellness, and healthy living queries, you can also answer questions about this AI itself, explain the PulseX website features, and guide users on how to navigate the website pages.\n\nPulseX Page Navigation Guide:\n- Home Page (/): Features, stats overview, and sign-up options.\n- About Us (/about): The mission behind PulseX and the core science team.\n- Features (/features): In-depth view of biometric tracking features and trainer utilities.\n- Contact (/contact): Technical support form and feedback channel.\n- FAQs (/faq): Answers to frequently asked questions about wearables and database updates.\n- Authentication: Sign In (/login) and Sign Up (/signup) screens.\n- Unified Dashboard Layout (accessible to logged-in users):\n  * User Overview (/dashboard): Telemetry stats (Heart Rate, Calories, Sleep, Water intake) and daily logs.\n  * User Assessment (/dashboard/assessment): Core fitness evaluation metrics.\n  * User Goals (/dashboard/goals): Active goal settings (e.g. daily steps target).\n  * Daily Activity Logs (/dashboard/activity): Manual logging for steps, sleep, and water.\n  * Workout Tracking (/dashboard/workouts): Logs for completed fitness sessions and history.\n  * Meal Planner (/dashboard/diet): Plan daily meal schedules and macro allocations.\n  * Trainer Hub (/trainer): Access point for verified coaches.\n  * Admin Console (/admin): System databases, user management, and tech nodes.\n\nIf a user asks completely unrelated questions (e.g., historical facts, general programming, pop culture), politely guide them back to fitness, health, or PulseX site assistance.'
                                    },
                                    ...(payload.history || []).map((msg) => ({
                                        role: msg.sender === 'user' ? 'user' : 'assistant',
                                        content: msg.text
                                    })),
                                    {
                                        role: 'user',
                                        content: payload.message
                                    }
                                ];
                                const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${groqApiKey}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        model: 'llama-3.3-70b-versatile',
                                        messages,
                                        temperature: 0.7,
                                        max_tokens: 1024
                                    })
                                });
                                if (!groqResponse.ok) {
                                    const errorData = await groqResponse.json().catch(() => ({}));
                                    console.error('Groq API error response:', groqResponse.status, errorData);
                                    if (groqResponse.status === 401) {
                                        res.statusCode = 401;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.end(JSON.stringify({ error: 'Invalid API key.' }));
                                        return;
                                    }
                                    if (groqResponse.status === 429) {
                                        res.statusCode = 429;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.end(JSON.stringify({ error: 'Rate limit reached.' }));
                                        return;
                                    }
                                    res.statusCode = 502; // Bad Gateway
                                    res.setHeader('Content-Type', 'application/json');
                                    res.end(JSON.stringify({ error: 'AI service unavailable.' }));
                                    return;
                                }
                                const groqData = await groqResponse.json();
                                const text = groqData.choices?.[0]?.message?.content || '';
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ text }));
                            }
                            catch (error) {
                                console.error('Error during chat completion proxy request:', error);
                                res.statusCode = 503; // Service Unavailable
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ error: 'Unable to connect to the AI service. Please try again later.' }));
                            }
                        });
                    });
                }
            }
        ]
    };
});
