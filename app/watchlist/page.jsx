'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Watchlist() {
  const { data: session, status } = useSession();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') signIn();
    if (status === 'authenticated') fetchWatchlist();
  }, [status]);

  async function fetchWatchlist() {
const res = await fetch(`/api/watchlist?user_id=${session.user.name}`);    const data = await res.json();
    setWatchlist(data.watchlist || []);
    setLoading(false);
  }

  async function removeFromWatchlist(id) {
    await fetch(`/api/watchlist?id=${id}`, { method: 'DELETE' });
    setWatchlist(watchlist.filter(item => item.id !== id));
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="text-lg font-medium">
          stage<span className="text-blue-500">front</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/dashboard" className="text-sm text-gray-500">discover</a>
          <a href="/watchlist" className="text-sm font-medium text-gray-900">watchlist</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Watchlist</h1>
        <p className="text-sm text-gray-400 mb-8">{watchlist.length} shows saved</p>

        {watchlist.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No shows saved yet. Go to <a href="/dashboard" className="text-blue-500">discover</a> to add some.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {watchlist.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{item.artist_name}</div>
                  <div className="text-sm text-gray-400 mt-1">{item.venue_name}</div>
                  <div className="text-sm text-gray-400">{item.event_date}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    item.status === 'onsale'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-500'
                  }`}>
                    {item.status === 'onsale' ? 'on sale' : item.status}
                  </span>
                  <a href={item.ticket_url} target="_blank" className="text-xs text-blue-500">
                    buy tickets →
                  </a>
                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
