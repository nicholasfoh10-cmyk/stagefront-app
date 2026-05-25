'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
    if (status === 'authenticated' && session?.accessToken) {
      fetchShows();
    }
  }, [status, session]);

async function fetchShows() {
    setLoading(true);
    try {
      const res = await fetch(`/api/shows?token=${session.accessToken}`);
      const data = await res.json();
      setShows(data.shows || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }
 async function fetchShows() {
      setLoading(true);
    try {
      const res = await fetch(`/api/shows?token=${session.accessToken}`);
      const data = await res.json();
      setShows(data.shows || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function addToWatchlist(show) {
    const res = await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: show.url,
        event_name: show.event,
        artist_name: show.artist,
        venue_name: show.venue,
        event_date: show.date,
        status: show.status,
        ticket_url: show.url,
        user_id: session.user.name
      })
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  }
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
  <div className="text-lg font-medium">
    stage<span className="text-blue-500">front</span>
  </div>
  <div className="flex items-center gap-6">
    <a href="/dashboard" className="text-sm font-medium text-gray-900">discover</a>
    <a href="/watchlist" className="text-sm text-gray-500">watchlist</a>
    <div className="text-sm text-gray-400">{session?.user?.name}</div>
  </div>
</nav>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Your shows</h1>
        <p className="text-sm text-gray-400 mb-8">Based on your Spotify listening history</p>

        {loading ? (
          <p className="text-gray-400 text-sm">finding your shows...</p>
        ) : shows.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No upcoming shows found for your top artists right now.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {shows.map((show, i) => (
  <div key={i} className="border border-gray-100 rounded-xl p-5 flex items-center justify-between">
    <div>
      <div className="font-medium text-gray-900">{show.artist}</div>
      <div className="text-sm text-gray-400 mt-1">{show.venue} · {show.city}</div>
      <div className="text-sm text-gray-400">{show.date}</div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
        show.status === 'onsale'
          ? 'bg-green-50 text-green-700'
          : 'bg-gray-50 text-gray-500'
      }`}>
        {show.status === 'onsale' ? 'on sale' : show.status}
      </span>
      <a href={show.url} target="_blank" className="text-xs text-blue-500">
        buy tickets →
      </a>
      <button
        onClick={() => addToWatchlist(show)}
        className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500"
      >
        + watch
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
