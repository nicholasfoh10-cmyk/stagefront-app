export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="text-lg font-medium">
          stage<span className="text-blue-500">front</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-500">how it works</a>
          <a href="/api/auth/signin" className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg">get started</a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 pt-24 pb-16 text-center">
        <div className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
          free forever
        </div>
        <h1 className="text-4xl font-medium text-gray-900 mb-4">
          Never miss an on-sale.<br />Never overpay on resale.
        </h1>
        <p className="text-lg text-gray-500 mb-10">
          Stagefront syncs with your Spotify, alerts you the moment face-value tickets drop, and tracks resale prices so you always know when to buy.
        </p>
        <a href="/api/auth/signin" className="inline-block bg-blue-500 text-white text-sm font-medium px-8 py-3 rounded-lg">
          connect your Spotify
        </a>
        <p className="text-xs text-gray-400 mt-4">no credit card required</p>
      </div>

      <div className="max-w-3xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-500 text-2xl mb-3">01</div>
            <div className="font-medium text-gray-900 mb-2">connect Spotify</div>
            <div className="text-sm text-gray-500">We pull your top artists and find their upcoming shows automatically.</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-500 text-2xl mb-3">02</div>
            <div className="font-medium text-gray-900 mb-2">get on-sale alerts</div>
            <div className="text-sm text-gray-500">The moment face-value tickets drop, you get notified with a direct link to buy.</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-blue-500 text-2xl mb-3">03</div>
            <div className="font-medium text-gray-900 mb-2">track resale prices</div>
            <div className="text-sm text-gray-500">If you miss the on-sale, we watch resale prices and alert you when to buy.</div>
          </div>
        </div>
      </div>
    </main>
  );
}