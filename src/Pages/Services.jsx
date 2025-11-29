const SERVICE_TIERS = [
  {
    id: "commercial",
    title: "Commercial Interiors",
    tagline: "Boardrooms, lounges, brandscapes",
    description:
      "Experience-driven workplaces, hospitality lounges, and concept stores with acoustics, ergonomic planning, and technology woven in.",
    deliverables: [
      "Master planning & zoning",
      "Signature reception & lobby design",
      "Custom lighting narratives",
      "Workcafé and collaboration lounges",
      "Material palette boards plus 3D renders",
      "End-to-end site supervision",
    ],
    palette: "Charcoal concrete, smoked oak, reflective metals.",
    duration: "16–24 weeks · 5,000–40,000 sqft",
    accent: "from-[#1e293b] to-[#0f172a]",
  },
  {
    id: "residential",
    title: "Residential Suites",
    tagline: "Apartments & penthouses",
    description:
      "Complete transformations for high-rise residences, including bespoke joinery, lighting, and styling for a ready-to-host finish.",
    deliverables: [
      "Lifestyle mapping & mood boards",
      "Modular + bespoke kitchen systems",
      "Furniture curation & styling",
      "Automation & lighting layouts",
      "On-site decor styling",
      "Handover documentation",
    ],
    palette: "Ivory plasters, aged brass, cashmere textiles.",
    duration: "12–18 weeks · 1,200–6,000 sqft",
    accent: "from-[#312e81] to-[#1f1b4b]",
  },
  {
    id: "villa",
    title: "Luxury Villa Atelier",
    tagline: "Estate, farmhouse & beach house",
    description:
      "Architecture-to-FF&E support for sprawling villas—courtyards, suites, pools, and entertaining zones styled under one narrative.",
    deliverables: [
      "Indoor-outdoor master planning",
      "Signature staircase & double-height focal points",
      "Landscape & lighting synergy",
      "Spa, pool, and wellness wing detailing",
      "Bespoke furniture workshops",
      "Concierge move-in services",
    ],
    palette: "Terracotta, travertine, cane, artisanal stone.",
    duration: "20–32 weeks · 3,500–15,000 sqft",
    accent: "from-[#3b2f2f] to-[#1a120f]",
  },
];

function Services() {
  return (
    <section className="min-h-screen px-6 md:px-16 py-16 bg-background text-white">
      <header className="max-w-3xl space-y-4 mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">
          RR Designs services
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold">
          Tailored design programs for every space type
        </h1>
        <p className="text-gray-300">
          From agile workplaces to bespoke villas, RR Designs crafts strategy, design, and turnkey delivery
          to match your pace, palette, and performance needs.
        </p>
      </header>

      <div className="grid gap-10">
        {SERVICE_TIERS.map((tier) => (
          <article
            key={tier.id}
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${tier.accent} p-8 lg:p-12`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary">{tier.tagline}</p>
                <h2 className="text-3xl font-semibold mt-2">{tier.title}</h2>
              </div>
              <div className="text-right text-sm text-gray-300 uppercase tracking-[0.3em]">
                <p>{tier.duration}</p>
              </div>
            </div>

            <p className="text-gray-200 mt-6 max-w-3xl">{tier.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <ul className="space-y-3 text-gray-200">
                {tier.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Material palette</p>
                  <p className="text-lg font-semibold">{tier.palette}</p>
                </div>

    <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Program timeline</p>
                  <p className="text-lg font-semibold">{tier.duration}</p>
                </div>

                <button className="w-full rounded-2xl border border-white/20 py-3 text-sm uppercase tracking-[0.3em] hover:border-primary transition">
                  Request detailed scope
                </button>
              </div>
            </div>
          </article>
        ))}
    </div>
    </section>
  );
}

export default Services;
