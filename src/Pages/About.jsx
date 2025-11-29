import thumb1 from '../assets/images/img1.jpg';
import thumb2 from '../assets/images/img2.jpg';
const CORE_VALUES = [
  {
    title: "Narrative first",
    description:
      "Every brief begins with ethnographic interviews, mood labs, and storyboards that map how you live, host, and work.",
  },
  {
    title: "Atelier craft",
    description:
      "RR Designs partners with local workshops across Vapi and neighboring regions to build bespoke furniture, lighting, and art.",
  },
  {
    title: "Turnkey clarity",
    description:
      "From 3D renders to handover, a single project lead manages costs, timeline, and site execution with daily reporting.",
  },
];

const STATS = [
  { value: "150+", label: "Interiors delivered" },
  { value: "22", label: "Cities across India" },
  { value: "12", label: "Craft ateliers on retainer" },
  { value: "96%", label: "Repeat clientele" },
];

const LEADERSHIP = [
  {
    name: "Owner 1",
    role: "Founder & Creative Director",
    bio: "Leads concept development, art direction, and bespoke furniture programs for every project.",
    image: thumb1,
  },
  {
    name: "Owner 2",
    role: "Founder & Principal Architect",
    bio: "Drives spatial planning, design execution, and project coordination with allied consultants.",
    image: thumb2,
  },
];

function About() {
  return (
    <section className="min-h-screen px-6 md:px-16 py-16 bg-background text-white space-y-16">
      <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">
            About RR Designs
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Boutique interior atelier crafting editorial-grade spaces since 2014.
          </h1>
          <p className="text-gray-300 text-lg">
            RR Designs is a Vapi-based studio making expressive interiors for residences, villas, boutique
            hospitality, and commercial addresses. Our playbook blends architectural rigour, art curation,
            and concierge-style project management to deliver turnkey outcomes.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4">
          <p className="uppercase text-sm tracking-[0.3em] text-gray-400">Atelier mantra</p>
          <p className="text-xl">
            “Spaces should feel collected, lived-in, and unmistakably you. We orchestrate narratives that age gracefully,
            travel well, and adapt to the rhythms of modern India.”
          </p>
          <p className="text-gray-400 text-sm">— Rizwan, Founder</p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {CORE_VALUES.map((value) => (
          <article
            key={value.title}
            className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Core value</p>
            <h3 className="text-2xl font-semibold mt-4">{value.title}</h3>
            <p className="text-gray-300 mt-3">{value.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="grid grid-cols-2 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-white/10 to-transparent text-center"
            >
              <p className="text-4xl font-semibold">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 p-8 bg-[#152026]">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">What we do</p>
          <ul className="mt-4 space-y-3 text-gray-200">
            <li>• Interior strategy, zoning, and modular layouts</li>
            <li>• Crafted kitchens, wardrobes, and loose furniture</li>
            <li>• Art curation, styling, and handover concierge</li>
            <li>• On-site execution with vetted trades & ateliers</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Leadership</p>
            <h2 className="text-3xl font-semibold">Creative core team</h2>
          </div>
          <p className="text-gray-300 max-w-2xl">
            RR Designs is lean by design. Each project is helmed by a principal, an architect, and a materials lead so you
            get senior attention and quick decisions across design phases.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {LEADERSHIP.map((member) => (
            <article
              key={member.name}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden"
            >
              <div className="h-64 w-full overflow-hidden bg-white/5 flex items-center justify-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center" 
                  loading="lazy"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  {member.role}
                </p>
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </article>
          ))}
    </div>
      </section>
    </section>
  );
}

export default About;
