import { useState, useEffect } from "react";
import { getGalleryItems } from "../utils/dataService";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    setGalleryItems(getGalleryItems());
  }, []);

  // Organize items by category and subcategory
  const organizedData = galleryItems.reduce((acc, item) => {
    const category = item.category || 'Residential';
    const subcategory = item.subcategory || 'Hall';
    
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }
    acc[category][subcategory].push(item);
    return acc;
  }, {});

  const categories = Object.keys(organizedData);
  const subcategories = selectedCategory ? Object.keys(organizedData[selectedCategory] || {}) : [];

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    if (selectedSubcategory === subcategory) {
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcategory);
    }
  };

  const getDisplayItems = () => {
    if (selectedCategory && selectedSubcategory) {
      return organizedData[selectedCategory]?.[selectedSubcategory] || [];
    }
    if (selectedCategory) {
      return [];
    }
    return [];
  };

  const displayItems = getDisplayItems();

  const openFullscreen = (image, index) => {
    // Collect all images from displayItems
    const images = [];
    displayItems.forEach((item) => {
      const itemImages = Array.isArray(item.images) ? item.images : (item.image ? [item.image] : []);
      images.push(...itemImages);
    });
    setAllImages(images);
    setFullscreenImage(image);
    setFullscreenImageIndex(images.findIndex(img => img === image));
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenImageIndex(0);
    setAllImages([]);
  };

  const nextFullscreenImage = () => {
    if (allImages.length > 0) {
      const nextIndex = (fullscreenImageIndex + 1) % allImages.length;
      setFullscreenImageIndex(nextIndex);
      setFullscreenImage(allImages[nextIndex]);
    }
  };

  const prevFullscreenImage = () => {
    if (allImages.length > 0) {
      const prevIndex = fullscreenImageIndex === 0 ? allImages.length - 1 : fullscreenImageIndex - 1;
      setFullscreenImageIndex(prevIndex);
      setFullscreenImage(allImages[prevIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenImage) return;
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowRight') {
        nextFullscreenImage();
      } else if (e.key === 'ArrowLeft') {
        prevFullscreenImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage, fullscreenImageIndex, allImages]);

  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-16 py-8 sm:py-12 md:py-16 bg-background text-white">
      <header className="max-w-3xl space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-primary">
          RR Designs portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">Gallery of finished narratives</h1>
        <p className="text-gray-300">
          A visual dive into residences, villas, boutique stays, and commercial hubs designed by RR Designs.
          Each image represents a chapter across India, curated for inspiration.
        </p>
      </header>

      {/* Breadcrumb Navigation */}
      {(selectedCategory || selectedSubcategory) && (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubcategory(null);
            }}
            className="hover:text-white transition"
          >
            All Categories
          </button>
          {selectedCategory && (
            <>
              <span>/</span>
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="hover:text-white transition"
              >
                {selectedCategory}
              </button>
            </>
          )}
          {selectedSubcategory && (
            <>
              <span>/</span>
              <span className="text-white">{selectedSubcategory}</span>
            </>
          )}
        </div>
      )}

      {/* Main Category Cards */}
      {!selectedCategory && (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
          {categories.map((category) => {
            const subcats = Object.keys(organizedData[category]);
            const totalItems = subcats.reduce((sum, subcat) => sum + organizedData[category][subcat].length, 0);
            const firstImage = subcats.reduce((img, subcat) => {
              if (img) return img;
              const items = organizedData[category][subcat];
              if (items.length > 0) {
                const images = Array.isArray(items[0].images) ? items[0].images : [];
                return images[0] || null;
              }
              return null;
            }, null);

            return (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur cursor-pointer hover:border-primary transition-all duration-300 hover:scale-[1.02]"
              >
                {firstImage && (
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                      src={firstImage}
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{category}</h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {subcats.length} subcategor{subcats.length !== 1 ? 'ies' : 'y'} • {totalItems} project{totalItems !== 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subcats.map((subcat) => (
                      <span
                        key={subcat}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-[0.1em] text-gray-300"
                      >
                        {subcat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold">
                    <span>View Gallery</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subcategory Cards */}
      {selectedCategory && !selectedSubcategory && (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {subcategories.map((subcategory) => {
            const items = organizedData[selectedCategory][subcategory];
            const totalImages = items.reduce((sum, item) => {
              const images = Array.isArray(item.images) ? item.images : [];
              return sum + images.length;
            }, 0);
            const firstImage = items.reduce((img, item) => {
              if (img) return img;
              const images = Array.isArray(item.images) ? item.images : [];
              return images[0] || null;
            }, null);

            return (
              <div
                key={subcategory}
                onClick={() => handleSubcategoryClick(subcategory)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur cursor-pointer hover:border-primary transition-all duration-300 hover:scale-[1.02]"
              >
                {firstImage && (
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={firstImage}
                      alt={subcategory}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">{subcategory}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {items.length} project{items.length !== 1 ? 's' : ''} • {totalImages} image{totalImages !== 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <span>View Images</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Gallery */}
      {selectedCategory && selectedSubcategory && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {displayItems.map((project) => {
            const images = Array.isArray(project.images) ? project.images : (project.image ? [project.image] : []);
            return images.map((image, index) => (
              <figure
                key={`${project.id}-${index}`}
                className="break-inside-avoid rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:-translate-y-1 hover:shadow-2xl transition cursor-pointer"
                onClick={() => openFullscreen(image, index)}
              >
                <img
                  src={image}
                  alt={`${project.title}${images.length > 1 ? ` - Image ${index + 1}` : ''}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {project.title && (
                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-300">{project.title}</p>
                    {project.location && (
                      <p className="text-xs text-gray-500 mt-1">{project.location}</p>
                    )}
                  </div>
                )}
              </figure>
            ));
          })}
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur z-[100] flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-primary z-10 bg-black/50 rounded-full p-2 transition"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl sm:text-3xl">close</span>
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevFullscreenImage();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white hover:text-primary z-10 bg-black/50 rounded-full p-2 sm:p-3 transition"
                aria-label="Previous"
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_left</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextFullscreenImage();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white hover:text-primary z-10 bg-black/50 rounded-full p-2 sm:p-3 transition"
                aria-label="Next"
              >
                <span className="material-symbols-outlined text-2xl sm:text-3xl">chevron_right</span>
              </button>
            </>
          )}

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          {allImages.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2 text-sm">
              {fullscreenImageIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

