import { useState } from "react";
import { sendContactEmail } from "../utils/emailService";

const studioContacts = [
  {
    label: "Studio",
    value: "hello@rrdesigns.studio",
    icon: "alternate_email",
  },
  {
    label: "Projects Hotline",
    value: "+91 98765 44433",
    icon: "call",
  },
  {
    label: "Flagship Atelier",
    value: "Orbit Mall, Vapi · Gujarat",
    icon: "pin_drop",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential",
    timeline: "",
    message: "",
  });
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmittedMessage("");

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmittedMessage("We received your brief. Our concierge will respond within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "Residential",
          timeline: "",
          message: "",
        });
      } else {
        setSubmittedMessage("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      setSubmittedMessage("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-16 bg-background text-white">
      <header className="max-w-3xl space-y-4 mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">Contact RR Designs</p>
        <h1 className="text-4xl md:text-5xl font-semibold">
          Let&apos;s craft an interior story that mirrors your lifestyle.
        </h1>
        <p className="text-gray-300">
          Share your vision, square footage, and timeline for a tailored consultation. RR Designs orchestrates
          high-touch experiences for residential, villa, and commercial environments across India.
        </p>
      </header>

      <div className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#2c3a40] to-[#101418] border border-white/10 p-4 sm:p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-primary mb-6">Concierge desk</p>
            <div className="space-y-6">
              {studioContacts.map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{label}</p>
                    <p className="text-xl font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm text-gray-400 uppercase tracking-[0.3em]">
              <div>
                <p>Instagram</p>
                <p className="text-white normal-case">@rrdesigns.in</p>
              </div>
              <div>
                <p>Whatsapp</p>
                <p className="text-white normal-case">+91 98987 55541</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 bg-white/5 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-primary">Visiting hours</p>
            <p className="text-gray-300">
              Monday to Saturday · 10 AM – 7 PM
              <br />
              Atelier walkthroughs by appointment only.
            </p>
            <p className="text-gray-400 text-sm">
              RR Designs operates satellite teams in Bengaluru, Mumbai, and Hyderabad for on-site supervision.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 md:p-8 backdrop-blur space-y-3 sm:space-y-4"
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-300">
              Full name
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                placeholder="Akash Menon"
                className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="text-sm text-gray-300">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="text-sm text-gray-300">
              Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={onChange}
                required
                placeholder="+91 90000 00000"
                className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="text-sm text-gray-300">
              Project type
              <select
                name="projectType"
                value={formData.projectType}
                onChange={onChange}
                className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Residential</option>
                <option>Villa</option>
                <option>Commercial</option>
                <option>Hospitality</option>
              </select>
            </label>
          </div>

          <label className="text-sm text-gray-300 block">
            Preferred timeline
            <input
              name="timeline"
              value={formData.timeline}
              onChange={onChange}
              placeholder="e.g., Jan 2025 or Immediate"
              className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="text-sm text-gray-300 block">
            Share your brief
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={onChange}
              placeholder="Square footage, location, design language, must-have spaces..."
              className="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-primary text-white py-3 font-semibold uppercase tracking-[0.4em] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send my brief"}
          </button>
          {submittedMessage && (
            <p className="text-sm text-green-300">{submittedMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

