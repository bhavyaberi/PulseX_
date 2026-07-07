import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Lock, Inbox, Mail, Trash2, CheckCircle2, RefreshCw } from "lucide-react";

const API_BASE = "http://localhost:5000/api/contact";
const SESSION_KEY = "pulse_admin_key";

export default function ContactRequests() {
    const { showToast } = useApp();
    const [adminKey, setAdminKey] = useState(sessionStorage.getItem(SESSION_KEY) || "");
    const [keyInput, setKeyInput] = useState("");
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const fetchRequests = async (key) => {
        setLoading(true);
        setAuthError("");
        try {
            const res = await fetch(API_BASE, {
                headers: { "x-admin-key": key }
            });
            if (res.status === 401) {
                setAuthError("Invalid admin key");
                sessionStorage.removeItem(SESSION_KEY);
                setAdminKey("");
                setLoading(false);
                return;
            }
            const result = await res.json();
            if (res.ok && result.success) {
                setRequests(result.data);
                sessionStorage.setItem(SESSION_KEY, key);
                setAdminKey(key);
            } else {
                showToast(result.message || "Failed to load requests", "error");
            }
        } catch (error) {
            showToast("Could not reach the server. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (adminKey) {
            fetchRequests(adminKey);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (!keyInput) {
            showToast("Please enter the admin key", "error");
            return;
        }
        fetchRequests(keyInput);
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
                body: JSON.stringify({ status })
            });
            const result = await res.json();
            if (res.ok && result.success) {
                setRequests((prev) => prev.map((r) => (r._id === id ? result.data : r)));
            } else {
                showToast(result.message || "Failed to update request", "error");
            }
        } catch (error) {
            showToast("Could not reach the server. Please try again.", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: "DELETE",
                headers: { "x-admin-key": adminKey }
            });
            const result = await res.json();
            if (res.ok && result.success) {
                setRequests((prev) => prev.filter((r) => r._id !== id));
                showToast("Request deleted", "success");
            } else {
                showToast(result.message || "Failed to delete request", "error");
            }
        } catch (error) {
            showToast("Could not reach the server. Please try again.", "error");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setAdminKey("");
        setRequests([]);
        setKeyInput("");
    };

    const statusStyles = {
        new: "bg-pulse/15 text-pulse",
        read: "bg-ink-faint/20 text-ink-dim",
        resolved: "bg-emerald-500/15 text-emerald-500"
    };

    // Gate: nothing is fetched or rendered until the correct admin key is supplied
    if (!adminKey) {
        return (
          <div className="min-h-[70vh] flex items-center justify-center container-px">
            <form onSubmit={handleUnlock} className="card-glass p-8 md:p-10 shadow-glow-lg w-full max-w-sm">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-5 w-5 text-pulse"/>
                <h3 className="font-display text-lg font-bold text-ink">Admin Access Only</h3>
              </div>
              <p className="text-xs text-ink-dim mb-6 leading-relaxed">
                This page is private. Enter the admin key to view submitted contact requests.
              </p>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Admin key"
                className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse transition mb-3"
              />
              {authError && <div className="text-xs text-red-500 mb-3">{authError}</div>}
              <button type="submit" disabled={loading} className="w-full btn-primary justify-center disabled:opacity-40">
                {loading ? "Verifying..." : "Unlock"}
              </button>
            </form>
          </div>
        );
    }

    return (
      <div className="container-px mx-auto max-w-5xl py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
              <Inbox className="h-5 w-5 text-pulse"/>
              Contact Requests
            </h1>
            <p className="text-xs text-ink-dim mt-1">Private inbox — visible to admins only.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchRequests(adminKey)} className="rounded-lg border border-line p-2 text-ink-dim hover:text-pulse hover:border-pulse transition" title="Refresh">
              <RefreshCw className="h-4 w-4"/>
            </button>
            <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-wider text-ink-dim hover:text-pulse transition px-3 py-2">
              Lock
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-xs text-ink-dim py-16">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-center text-xs text-ink-dim py-16">No contact requests yet.</div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r._id} className="card p-6 border border-line bg-surface/40">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-ink">{r.name}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyles[r.status] || statusStyles.new}`}>
                        {r.status}
                      </span>
                    </div>
                    <a href={`mailto:${r.email}`} className="text-xs text-ink-dim flex items-center gap-1 mt-1 hover:text-pulse transition">
                      <Mail className="h-3 w-3"/>
                      {r.email}
                    </a>
                  </div>
                  <div className="text-[10px] text-ink-faint">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pulse">{r.subject}</span>
                  <p className="text-xs text-ink-dim leading-relaxed mt-1">{r.message}</p>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-line/50">
                  {r.status !== "resolved" && (
                    <button onClick={() => handleUpdateStatus(r._id, "resolved")} className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1 hover:opacity-80 transition">
                      <CheckCircle2 className="h-3.5 w-3.5"/>
                      Mark Resolved
                    </button>
                  )}
                  {r.status === "new" && (
                    <button onClick={() => handleUpdateStatus(r._id, "read")} className="text-[10px] font-bold uppercase tracking-wider text-ink-dim hover:text-pulse transition">
                      Mark Read
                    </button>
                  )}
                  <button onClick={() => handleDelete(r._id)} className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1 hover:opacity-80 transition ml-auto">
                    <Trash2 className="h-3.5 w-3.5"/>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}
