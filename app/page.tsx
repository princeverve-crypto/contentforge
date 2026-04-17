export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">ContentForge</div>
          <div className="flex gap-4">
            <a href="/studio" className="px-4 py-2 text-gray-700 hover:text-gray-900">
              Create
            </a>
            <a href="/studio" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Create beautiful images in seconds
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Write what you want. AI creates it. Download. Done. No design skills needed.
          </p>
          <a
            href="/studio"
            className="inline-block px-8 py-4 bg-black text-white rounded font-semibold hover:bg-gray-900 transition"
          >
            Start Creating →
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">How it works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Write',
                desc: 'Describe what you want to create'
              },
              {
                step: '2',
                title: 'Choose format',
                desc: 'TikTok, Instagram, YouTube, or Square'
              },
              {
                step: '3',
                title: 'Generate',
                desc: 'AI creates your image (10 seconds)'
              },
              {
                step: '4',
                title: 'Download',
                desc: 'Save and share anywhere'
              }
            ].map((item) => (
              <div key={item.step}>
                <div className="text-4xl font-bold text-gray-300 mb-2">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Free',
              price: 'Free',
              images: '5 images/month',
              features: ['Basic generation', 'Try it out']
            },
            {
              name: 'Creator',
              price: '$29',
              period: '/month',
              images: '100 images/month',
              features: ['All features', 'Priority generation', 'Email support'],
              highlight: true
            },
            {
              name: 'Pro',
              price: '$99',
              period: '/month',
              images: 'Unlimited',
              features: ['Everything', 'Team access', 'Premium support']
            }
          ].map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg p-8 ${
                plan.highlight
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-1">
                {plan.price}
                {plan.period && <span className="text-lg text-gray-400">{plan.period}</span>}
              </div>
              <p className={`mb-6 ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                {plan.images}
              </p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded font-semibold transition ${
                  plan.highlight
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'border border-gray-300 hover:border-gray-400'
                }`}
              >
                Choose plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to create?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join creators, entrepreneurs, and businesses creating beautiful content.
          </p>
          <a
            href="/studio"
            className="inline-block px-8 py-4 bg-white text-black rounded font-semibold hover:bg-gray-100 transition"
          >
            Get started free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p>&copy; 2026 ContentForge. Built for creators.</p>
        </div>
      </footer>
    </main>
  )
}
