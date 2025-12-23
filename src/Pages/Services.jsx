import { useState } from "react";
import { sendServiceRequestEmail } from "../utils/emailService";

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
  const [selectedService, setSelectedService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    projectDetails: "",
    timeline: "", 
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleOpenForm = (service) => {
    setSelectedService(service);
    setFormData({
      ...formData,
      serviceType: service.title,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedService(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      projectDetails: "",
      timeline: "",
      budget: "",
    });
    setSubmitMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const result = await sendServiceRequestEmail(formData);
      
      if (result.success) {
        setSubmitMessage("Thank you! We've received your request. Our team will contact you within 24 hours.");
        setTimeout(() => {
          handleCloseForm();
        }, 3000);
      } else {
        console.error('Service request error:', result.error);
        setSubmitMessage(result.error || "Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error('Service request exception:', error);
      setSubmitMessage(error.message || "Network error. Please check if the server is running or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="min-h-screen px-4 sm:px-6 md:px-16 py-8 sm:py-12 md:py-16 bg-background text-white">
        <header className="max-w-3xl space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-primary">
            RR Designs services
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Tailored design programs for every space type
          </h1>
          <p className="text-gray-300">
            From agile workplaces to bespoke villas, RR Designs crafts strategy, design, and turnkey delivery
            to match your pace, palette, and performance needs.
          </p>
        </header>

        <div className="grid gap-6 sm:gap-8 md:gap-10">
          {SERVICE_TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br ${tier.accent} p-4 sm:p-6 md:p-8 lg:p-12`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-primary">{tier.tagline}</p>
                  <h2 className="text-2xl sm:text-3xl font-semibold mt-2">{tier.title}</h2>
                </div>
                <div className="text-left md:text-right text-xs sm:text-sm text-gray-300 uppercase tracking-[0.3em]">
                  <p>{tier.duration}</p>
                </div>
              </div>

              <p className="text-gray-200 mt-4 sm:mt-6 max-w-3xl text-sm sm:text-base">{tier.description}</p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <ul className="space-y-3 text-gray-200">
                  {tier.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Material palette</p>
                    <p className="text-base sm:text-lg font-semibold">{tier.palette}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Program timeline</p>
                    <p className="text-base sm:text-lg font-semibold">{tier.duration}</p>
                  </div>

                  <button 
                    onClick={() => handleOpenForm(tier)}
                    className="w-full rounded-xl sm:rounded-2xl border border-white/20 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-[0.3em] hover:border-primary transition"
                  >
                    Request detailed scope
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Service Request Form Modal */}
      {isFormOpen && selectedService && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8 overflow-y-auto"
          onClick={handleCloseForm}
        >
          <div
            className="relative max-w-2xl w-full bg-[#111418] rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white z-10 transition"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">close</span>
            </button>

            <div className="mb-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-primary mb-2">
                Request Detailed Scope
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{selectedService.title}</h2>
              <p className="text-gray-400 text-sm">{selectedService.tagline}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 90000 00000"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Service Type
                  </label>
                  <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Project Details *
                </label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about your project: square footage, location, design preferences, specific requirements..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Preferred Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Jan 2025 or Immediate"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Budget Range (Optional)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., ₹5-10 Lakhs"
                  />
                </div>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-xl text-sm ${
                  submitMessage.includes("Thank you") 
                    ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}>
                  {submitMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primary text-black rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-3 border border-white/20 rounded-xl hover:border-primary transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Services;
