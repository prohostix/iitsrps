"use client";

import { useState } from "react";
import { Instagram, Loader2, RefreshCw } from "lucide-react";
import { syncInstagramPhotosAction } from "@/lib/actions";

export default function InstagramSyncButton() {
    const [syncing, setSyncing] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleSync() {
        setSyncing(true);
        setMessage(null);

        try {
            const result = await syncInstagramPhotosAction();
            if (result.success) {
                setMessage({ type: 'success', text: `Successfully synced ${result.count} new photos!` });
                // Refresh the page to show new images
                window.location.reload();
            } else {
                setMessage({ type: 'error', text: result.error || 'Failed to sync' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setSyncing(false);
        }
    }

    return (
        <div className="mb-8">
            <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
                {syncing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Instagram className="w-5 h-5" />
                )}
                {syncing ? 'Syncing...' : 'Sync from Instagram'}
            </button>

            {message && (
                <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}
