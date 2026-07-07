let currentAbortController = null;
/**
 * Sends a message and history payload to the secure local backend /api/chat.
 * Implements request cancellation using AbortController.
 */
export async function generateAIResponse(message, history = []) {
    // 1. Cancel any active in-flight request to prevent race conditions and excessive load
    if (currentAbortController) {
        currentAbortController.abort();
    }
    // Create a new controller for the current request
    currentAbortController = new AbortController();
    const { signal } = currentAbortController;
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                history,
            }),
            signal,
        });
        // 2. Map status codes to specific user-friendly error codes
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("RATE_LIMIT_EXCEEDED");
            }
            throw new Error("AI_SERVICE_UNAVAILABLE");
        }
        const data = await response.json();
        return data.text || "";
    }
    catch (error) {
        // If the request was cancelled deliberately, don't bubble up the error
        if (error.name === "AbortError") {
            console.log("Request aborted: a newer message was sent.");
            throw error; // Re-throw so the calling component can detect it
        }
        console.error("Pulse AI response error:", error);
        throw error;
    }
    finally {
        // Clear the active controller if it matches the current request
        if (currentAbortController?.signal === signal) {
            currentAbortController = null;
        }
    }
}
