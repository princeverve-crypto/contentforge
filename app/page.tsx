export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">ContentForge</h1>
        <p className="text-gray-400">Create AI images. Share. Earn.</p>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto mb-12">
        <div className="mb-8">
          <h2 className="text-5xl font-bold mb-4">
            Beautiful Images in Seconds
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Write a caption. We generate an image. Download. Done.
          </p>
          <a
            href="/studio"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded font-semibold"
          >
            Get Started Free →
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto mb-12 bg-slate-900 p-8 rounded">
        <h3 className="text-2xl font-bold mb-6">How It Works</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-2xl">1️⃣</span>
            <div>
              <p className="font-semibold">Write Caption</p>
              <p className="text-gray-400">Describe what you want to see</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">2️⃣</span>
            <div>
              <p className="font-semibold">Choose Format</p>
              <p className="text-gray-400">TikTok, Instagram, YouTube, or Square</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">3️⃣</span>
            <div>
              <p className="font-semibold">Generate</p>
              <p className="text-gray-400">AI creates beautiful image (10 seconds)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">4️⃣</span>
            <div>
              <p className="font-semibold">Download & Share</p>
              <p className="text-gray-400">Post to TikTok, Instagram, YouTube</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl font-bold mb-6">Pricing</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: 'Free',
              price: '$0/month',
              images: '5 images',
              desc: 'Try it out'
            },
            {
              name: 'Creator',
              price: '$29/month',
              images: '100 images',
              desc: 'Most popular'
            },
            {
              name: 'Pro',
              price: '$99/month',
              images: 'Unlimited',
              desc: 'Serious creators'
            }
          ].map((tier) => (
            <div key={tier.name} className="bg-slate-900 p-6 rounded border border-slate-700">
              <p className="font-bold text-lg">{tier.name}</p>
              <p className="text-2xl font-bold my-2">{tier.price}</p>
              <p className="text-cyan-400 font-semibold mb-4">{tier.images}</p>
              <p className="text-gray-400 text-sm">{tier.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto bg-slate-900 p-8 rounded text-center">
        <h3 className="text-2xl font-bold mb-4">Ready?</h3>
        <p className="text-gray-300 mb-6">Create your first image right now.</p>
        <a
          href="/studio"
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded font-semibold text-lg"
        >
          Go to Studio →
        </a>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-700 text-center text-gray-400 text-sm">
        <p>&copy; 2026 ContentForge. Built for creators.</p>
      </footer>
    </main>
  )
}
