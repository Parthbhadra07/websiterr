import { useState, useEffect } from "react";
import { getGalleryItems } from "../utils/dataService";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    setGalleryItems(getGalleryItems());
  }, []);

  return (
    <section className="min-h-screen px-6 md:px-16 py-16 bg-background text-white">
      <header className="max-w-3xl space-y-4 mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">
          RR Designs portfolio
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold">Gallery of finished narratives</h1>
        <p className="text-gray-300">
          A visual dive into residences, villas, boutique stays, and commercial hubs designed by RR Designs.
          Each image represents a chapter across India, curated for inspiration.
        </p>
      </header>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryItems.map((project) => (
          <figure
            key={project.id}
            className="break-inside-avoid rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:-translate-y-1 hover:shadow-2xl transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

