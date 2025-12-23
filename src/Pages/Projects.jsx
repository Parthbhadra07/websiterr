import { useState, useEffect } from "react";
import { getProjects } from "../utils/dataService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const openProject = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  const openFullscreen = (imageIndex) => {
    if (!selectedProject) return;
    setFullscreenImage(selectedProject.images[imageIndex]);
    setFullscreenImageIndex(imageIndex);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenImageIndex(0);
  };

  const nextFullscreenImage = () => {
    if (!selectedProject) return;
    const nextIndex = (fullscreenImageIndex + 1) % selectedProject.images.length;
    setFullscreenImageIndex(nextIndex);
    setFullscreenImage(selectedProject.images[nextIndex]);
  };

  const prevFullscreenImage = () => {
    if (!selectedProject) return;
    const prevIndex = fullscreenImageIndex === 0 ? selectedProject.images.length - 1 : fullscreenImageIndex - 1;
    setFullscreenImageIndex(prevIndex);
    setFullscreenImage(selectedProject.images[prevIndex]);
  };

  // Keyboard navigation for fullscreen
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
  }, [fullscreenImage, fullscreenImageIndex, selectedProject]);

  return (
    <section className="min-h-screen px-6 md:px-16 py-16 bg-background text-white">
      <header className="max-w-3xl space-y-4 mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-primary">
          Featured Projects
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold">
          Crafted spaces with signature RR detailing
        </h1>
        <p className="text-gray-300">
          Explore a curated mix of residential, commercial, and hospitality builds.
          Each card unlocks process shots, finish schedules, and detailing notes.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur cursor-pointer"
            onClick={() => openProject(project)}
          >
            <div className="h-60 overflow-hidden">
              {project.video ? (
                <video
                  src={project.video}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={project.images[0]}
                />
              ) : (
                <div
                  className="h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.images[0]})` }}
                />
              )}
            </div>
            <div className="p-6 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                {project.category}
              </p>
              <h3 className="text-2xl font-semibold">{project.name}</h3>
              <p className="text-gray-300 text-sm">{project.location}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 uppercase tracking-[0.2em]">
                <span>{project.area}</span>
                <span className="w-1 h-1 rounded-full bg-gray-500" />
                <span>{project.year}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3">
                {project.description}
              </p>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </article>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8 z-50 overflow-y-auto">
          <div className="relative max-w-6xl w-full bg-[#111418] rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden my-4 sm:my-8">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white z-10"
              onClick={closeProject}
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">close</span>
            </button>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <img
                    src={selectedProject.images[activeImageIndex]}
                    alt={`${selectedProject.name} view ${activeImageIndex + 1}`}
                    className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl sm:rounded-2xl cursor-pointer hover:opacity-90 transition"
                    onClick={() => openFullscreen(activeImageIndex)}
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 rounded-full p-1.5 sm:p-2 hover:bg-black/80"
                  >
                    <span className="material-symbols-outlined text-lg sm:text-xl">chevron_left</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 rounded-full p-1.5 sm:p-2 hover:bg-black/80"
                  >
                    <span className="material-symbols-outlined text-lg sm:text-xl">chevron_right</span>
                  </button>
                </div>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {selectedProject.images.map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-16 w-20 sm:h-20 sm:w-28 rounded-lg sm:rounded-xl overflow-hidden border flex-shrink-0 ${
                        activeImageIndex === index
                          ? "border-primary"
                          : "border-transparent opacity-60"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${selectedProject.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-primary">
                  {selectedProject.category}
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold">{selectedProject.name}</h2>
                <p className="text-gray-300 text-sm sm:text-base">{selectedProject.description}</p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-gray-400">
                  <div>
                    <dt className="uppercase tracking-[0.3em] text-xs text-gray-500">
                      Location
                    </dt>
                    <dd className="text-white">{selectedProject.location}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.3em] text-xs text-gray-500">Area</dt>
                    <dd className="text-white">{selectedProject.area}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.3em] text-xs text-gray-500">Year</dt>
                    <dd className="text-white">{selectedProject.year}</dd>
                  </div>
    <div>
                    <dt className="uppercase tracking-[0.3em] text-xs text-gray-500">
                      Palette
                    </dt>
                    <dd className="text-white">{selectedProject.palette}</dd>
                  </div>
                </dl>

                <button
                  onClick={closeProject}
                  className="mt-4 w-full rounded-2xl border border-white/20 py-3 text-sm uppercase tracking-[0.4em] hover:border-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
    </div>
      )}

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && selectedProject && (
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

          {selectedProject.images.length > 1 && (
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
              alt={`${selectedProject.name} - Fullscreen view`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          {selectedProject.images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2 text-sm">
              {fullscreenImageIndex + 1} / {selectedProject.images.length}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Projects;
