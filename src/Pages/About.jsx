import thumb1 from "../assets/images/img1.jpg";
import thumb2 from "../assets/images/img2.jpg";

const CORE_VALUES = [
  {
    title: "Design with purpose",
    description:
      "We begin every project by understanding lifestyle, workflow, and budget. Our designs are practical, timeless, and tailored to real needs.",
  },
  {
    title: "Craft & execution",
    description:
      "We collaborate with skilled craftsmen and vendors across Vapi and Gujarat to deliver high-quality finishes and durable interiors.",
  },
  {
    title: "End-to-end delivery",
    description:
      "From concept design and 3D visuals to material selection and execution, we manage everything under one roof.",
  },
];

const STATS = [
  { value: "120+", label: "Projects completed" },
  { value: "10+", label: "Years of experience" },
  { value: "8+", label: "Cities served" },
  { value: "90%", label: "Happy clients" },
];

const LEADERSHIP = [
  {
    name: "Rizwan Shaikh",
    role: "Founder & Interior Designer",
    bio: "Leads design concepts, client coordination, and creative detailing for all residential and commercial projects.",
    image: thumb1,
  },
  {
    name: "Raja Gulani",
    role: "Founder & Interior Designer",
    bio: "Leads design concepts, client coordination, and creative detailing for all residential and commercial projects.",
    image: thumb2,
  },
];

function About() {
  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-16 py-12 bg-background text-white space-y-16">
      
      {/* HERO */}
      <header className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            About RR Designs
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Crafting thoughtful interiors for homes & businesses in Vapi.
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            RR Designs is a Vapi-based interior design studio specializing in
            residential, commercial, and turnkey interior solutions. We combine
            creative design, technical planning, and reliable execution to
            create spaces that are functional, elegant, and long-lasting.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 space-y-4">
          <p className="uppercase text-xs tracking-[0.3em] text-gray-400">
            Our philosophy
          </p>
          <p className="text-lg">
            “Good interiors improve daily life. We focus on comfort,
            functionality, and visual harmony — not trends that fade.”
          </p>
          <p className="text-gray-400 text-sm">
            — Rizwan Shaikh, Founder
          </p>
        </div>
      </header>

      {/* CORE VALUES */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CORE_VALUES.map((value) => (
          <article
            key={value.title}
            className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Core value
            </p>
            <h3 className="text-2xl font-semibold mt-4">{value.title}</h3>
            <p className="text-gray-300 mt-3">{value.description}</p>
          </article>
        ))}
      </section>

      {/* STATS + SERVICES */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="grid grid-cols-2 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-white/10 to-transparent text-center"
            >
              <p className="text-3xl md:text-4xl font-semibold">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 p-8 bg-[#152026]">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            What we do
          </p>
          <ul className="mt-4 space-y-3 text-gray-200">
            <li>• Residential & commercial interior design</li>
            <li>• Modular kitchens, wardrobes & furniture</li>
            <li>• 3D designs, planning & material selection</li>
            <li>• Complete turnkey execution</li>
          </ul>
        </div>
      </section>

      {/* LEADERSHIP */}
<section className="space-y-10">
  <div className="flex flex-col md:flex-row md:justify-between gap-4">
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-primary">
        Leadership
      </p>
      <h2 className="text-3xl font-semibold">
        The people behind RR Designs
      </h2>
    </div>
    <p className="text-gray-300 max-w-2xl">
      Each project at RR Designs is personally guided by its founders,
      ensuring attention to detail, material integrity, and thoughtful execution.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
    {LEADERSHIP.map((member) => (
      <div
        key={member.name}
        className="group relative overflow-hidden"
      >
        {/* Image */}
        <div className="h-[420px] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="
              w-full h-full object-cover
              grayscale
              group-hover:grayscale-0
              transition-all duration-700 ease-in-out
              scale-105 group-hover:scale-100
            "
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Text */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-300">
            {member.role}
          </p>
          <h3 className="text-2xl font-semibold text-white mt-1">
            {member.name}
          </h3>
          <p className="text-gray-300 text-sm mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {member.bio}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* GOOGLE MAP */}
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Our location
          </p>
          <h2 className="text-3xl font-semibold">Visit our studio in Vapi</h2>
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/10 h-[350px] md:h-[450px]">
          <iframe
            title="RR Designs Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29927.234380134443!2d72.93424470000002!3d20.345571900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0ce3604380f73%3A0x9ebbdb883c29600!2sRR%20DESIGNS!5e0!3m2!1sen!2sin!4v1766466354534!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </section>
  );
}

export default About;
