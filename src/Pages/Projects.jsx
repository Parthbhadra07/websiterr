import { useState, useEffect } from "react";
import { getProjects } from "../utils/dataService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center px-4 py-8 z-50">
          <div className="relative max-w-6xl w-full bg-[#111418] rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={closeProject}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedProject.images[activeImageIndex]}
                    alt={`${selectedProject.name} view ${activeImageIndex + 1}`}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 rounded-full p-2 hover:bg-black/80"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 rounded-full p-2 hover:bg-black/80"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {selectedProject.images.map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-20 w-28 rounded-xl overflow-hidden border ${
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

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-primary">
                  {selectedProject.category}
                </p>
                <h2 className="text-3xl font-semibold">{selectedProject.name}</h2>
                <p className="text-gray-300">{selectedProject.description}</p>

                <dl className="grid grid-cols-2 gap-4 text-sm text-gray-400">
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
    </section>
  );
}

export default Projects;
