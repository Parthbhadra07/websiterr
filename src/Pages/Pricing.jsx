import { useMemo, useState } from "react";
import { sendPricingEmail } from "../utils/emailService";

const TIERS = {
  normal: { label: "Normal", rate: 1200 },
  premium: { label: "Premium", rate: 1800 },
  royal: { label: "Royal", rate: 2500 },
};

const PROPERTY_TYPES = {
  commercial: { label: "Commercial", rate: 2100 },
  villa: { label: "Villa", rate: 2400 },
  residential: { label: "Residential", rate: 1900 },
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Pricing() {
  const [squareFeet, setSquareFeet] = useState(900);
  const [selectedTier, setSelectedTier] = useState("normal");
  const [propertyType, setPropertyType] = useState("commercial");
  const [sliderSqft, setSliderSqft] = useState(1200);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Commercial",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimatedQuote = useMemo(() => {
    const sqft = Number(squareFeet) || 0;
    return sqft * TIERS[selectedTier].rate;
  }, [squareFeet, selectedTier]);

  const sliderQuote = useMemo(() => {
    return sliderSqft * PROPERTY_TYPES[propertyType].rate;
  }, [sliderSqft, propertyType]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    try {
      const quoteDetails = {
        squareFeet: squareFeet,
        tier: TIERS[selectedTier].label,
        quote: currency.format(estimatedQuote),
      };

      const result = await sendPricingEmail(formData, quoteDetails);
      
      if (result.success) {
        setFormStatus("Thanks! Our team will reach out with a tailored proposal within 24 hours.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "Commercial",
          message: "",
        });
      } else {
        setFormStatus("Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      setFormStatus("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col gap-12 py-16 px-6 md:px-16 text-white">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">RR Designs</p>
        <h1 className="text-4xl md:text-5xl font-semibold">Transparent pricing for every vision</h1>
        <p className="text-gray-200">
          Choose your desired square footage, pick a design intensity, and we&apos;ll instantly project
          the investment required. Estimates include concept, detailing, and turnkey delivery.
        </p>
      </header>

      {/* Quote form */}
      <div className="grid gap-10 lg:grid-cols-2 items-start bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">
        <div className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-[0.3em] text-gray-300 mb-2">
              Square footage
            </label>
            <input
              type="number"
              min="100"
              step="50"
              value={squareFeet}
              onChange={(event) => setSquareFeet(event.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter total area"
            />
            <p className="text-xs text-gray-400 mt-2">Tip: include circulation and utility areas for accuracy.</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-300">Design level</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSelectedTier(key)}
                  className={`px-4 py-3 rounded-2xl border transition-all duration-200 ${
                    selectedTier === key
                      ? "border-primary bg-primary/20 text-white"
                      : "border-white/10 text-gray-300 hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">{tier.label}</p>
                  <p className="text-xs text-gray-300">{currency.format(tier.rate)}/sqft</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-black/40 border border-white/10 p-6 flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Estimated quote</p>
            <p className="text-4xl font-semibold">{currency.format(estimatedQuote || 0)}</p>
            <p className="text-xs text-gray-400">
              Includes furniture concept, lighting plan, finishes selection, and on-site supervision for the chosen tier.
            </p>
          </div>
        </div>

        {/* Slider quotation maker */}
        <div className="rounded-3xl bg-gradient-to-br from-[#2e3f46] to-[#11181c] border border-white/10 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-300">Quick quotation maker</p>
              <h2 className="text-2xl font-semibold">Slide to explore budgets</h2>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary">tune</span>
          </div>

          <div>
            <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
              <span>500 sqft</span>
              <span>2500 sqft</span>
            </div>
            <input
              type="range"
              min="500"
              max="2500"
              step="50"
              value={sliderSqft}
              onChange={(event) => setSliderSqft(Number(event.target.value))}
              className="w-full accent-primary"
            />
            <p className="mt-2 text-sm text-gray-300">
              {sliderSqft.toLocaleString()} sqft selected
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {Object.entries(PROPERTY_TYPES).map(([key, type]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPropertyType(key)}
                className={`px-5 py-3 rounded-2xl border transition ${
                  propertyType === key ? "border-primary bg-primary/20" : "border-white/10 text-gray-300"
                }`}
              >
                <p className="font-semibold">{type.label}</p>
                <p className="text-xs text-gray-300">{currency.format(type.rate)}/sqft</p>
              </button>
            ))}
          </div>

          <div className="bg-black/40 rounded-3xl p-6 border border-white/10">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Projected investment</p>
            <p className="text-4xl font-semibold">{currency.format(sliderQuote)}</p>
            <p className="text-xs text-gray-400 mt-2">
              Drag the slider or switch property type tabs to see how sector-specific rates influence budgets.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Get a bespoke proposal</p>
          <h2 className="text-3xl font-semibold">Tell us about your project</h2>
          <p className="text-gray-300">
            Share a few basics and the RR Designs concierge team will send a detailed quote with timelines, material palettes,
            and scope notes. No spam—just thoughtful guidance.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-300">Full name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Raj Rao"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+91 90000 00000"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Project type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleFormChange}
                className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Commercial</option>
                <option>Villa</option>
                <option>Residential</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Project details</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleFormChange}
              className="w-full mt-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Share sqft, city, style preferences, and desired timeline..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Request my quote"}
          </button>
          {formStatus && <p className="text-sm text-green-300">{formStatus}</p>}
        </form>
      </div>
    </section>
  );
}

