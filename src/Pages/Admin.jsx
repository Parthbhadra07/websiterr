import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  verifyPassword,
} from "../utils/dataService";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("gallery"); // 'gallery' or 'projects'
  
  // Gallery state
  const [galleryItems, setGalleryItems] = useState([]);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    location: "",
    category: "Residential",
    subcategory: "Hall",
    images: "",
  });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    category: "",
    location: "",
    area: "",
    year: "",
    palette: "",
    description: "",
    video: "",
    images: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setGalleryItems(getGalleryItems());
    setProjects(getProjects());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyPassword(password)) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  };

  // Gallery handlers
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, galleryForm);
      setEditingGalleryItem(null);
    } else {
      addGalleryItem(galleryForm);
    }
    setGalleryForm({ title: "", location: "", images: "" });
    loadData();
  };

  const handleEditGallery = (item) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      title: item.title,
      location: item.location,
      images: Array.isArray(item.images) ? item.images.join(", ") : (item.image || ""),
    });
  };

  const handleDeleteGallery = (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      deleteGalleryItem(id);
      loadData();
    }
  };

  const handleCancelEdit = () => {
    setEditingGalleryItem(null);
    setGalleryForm({ title: "", location: "", images: "" });
  };

  // Project handlers
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, projectForm);
      setEditingProject(null);
    } else {
      addProject(projectForm);
    }
    setProjectForm({
      name: "",
      category: "",
      location: "",
      area: "",
      year: "",
      palette: "",
      description: "",
      video: "",
      images: "",
    });
    loadData();
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      category: project.category,
      location: project.location,
      area: project.area,
      year: project.year,
      palette: project.palette,
      description: project.description,
      video: project.video || "",
      images: Array.isArray(project.images) ? project.images.join(", ") : project.images || "",
    });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
      loadData();
    }
  };

  const handleCancelProjectEdit = () => {
    setEditingProject(null);
    setProjectForm({
      name: "",
      category: "",
      location: "",
      area: "",
      year: "",
      palette: "",
      description: "",
      video: "",
      images: "",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-md w-full bg-white/5 backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-primary text-black rounded-lg sm:rounded-xl font-semibold hover:opacity-90 transition text-sm sm:text-base"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate("/")}
            className="mt-3 sm:mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-lg sm:rounded-xl hover:border-primary transition text-sm sm:text-base"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white px-4 sm:px-6 md:px-16 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-lg sm:rounded-xl hover:border-primary transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 sm:px-6 py-2 sm:py-3 border-b-2 transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === "gallery"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 sm:px-6 py-2 sm:py-3 border-b-2 transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === "projects"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Projects
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                {editingGalleryItem ? "Edit Gallery Item" : "Add Gallery Item"}
              </h2>
              <form onSubmit={handleGallerySubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="Project Title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={galleryForm.location}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="City, State"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Category
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => {
                        setGalleryForm({
                          ...galleryForm,
                          category: e.target.value,
                        });
                      }}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="Commercial">Commercial</option>
                      <option value="Residential">Residential</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={galleryForm.subcategory}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, subcategory: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="e.g., Office, Mart, Store, Bedroom, Kitchen, Hall"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Image URLs (comma-separated)
                  </label>
                  <textarea
                    value={galleryForm.images}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, images: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-black rounded-lg sm:rounded-xl font-semibold hover:opacity-90 transition text-sm sm:text-base"
                  >
                    {editingGalleryItem ? "Update" : "Add"} Gallery Item
                  </button>
                  {editingGalleryItem && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-lg sm:rounded-xl hover:border-primary transition text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Gallery Items ({galleryItems.length})</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {galleryItems.map((item) => {
                  const images = Array.isArray(item.images) ? item.images : (item.image ? [item.image] : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden"
                    >
                      {images.length > 0 && (
                        <div className="relative">
                          <img
                            src={images[0]}
                            alt={item.title}
                            className="w-full h-40 sm:h-48 object-cover"
                          />
                          {images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-primary text-black px-2 py-1 rounded text-xs font-semibold">
                              +{images.length - 1} more
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm mb-1">{item.location}</p>
                        <p className="text-primary text-xs mb-3 sm:mb-4">
                          {item.category || 'Residential'} • {item.subcategory || 'Hall'}
                        </p>
                        <p className="text-gray-500 text-xs mb-3 sm:mb-4">
                          {images.length} image{images.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleEditGallery(item)}
                            className="flex-1 px-3 sm:px-4 py-2 bg-primary text-black rounded-lg text-xs sm:text-sm font-semibold hover:opacity-90 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="flex-1 px-3 sm:px-4 py-2 border border-red-400 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-400/10 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                {editingProject ? "Edit Project" : "Add Project"}
              </h2>
              <form onSubmit={handleProjectSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectForm.name}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="Project Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, category: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="Residential, Commercial, etc."
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={projectForm.location}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, location: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="City, State"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Area
                    </label>
                    <input
                      type="text"
                      value={projectForm.area}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, area: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="4,800 sqft"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Year
                    </label>
                    <input
                      type="text"
                      value={projectForm.year}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, year: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                      Color Palette
                    </label>
                    <input
                      type="text"
                      value={projectForm.palette}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, palette: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                      placeholder="Warm neutrals, brushed brass..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, description: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="Project description..."
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Video URL (optional)
                  </label>
                  <input
                    type="url"
                    value={projectForm.video}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, video: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Image URLs (comma-separated)
                  </label>
                  <textarea
                    value={projectForm.images}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, images: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-black rounded-lg sm:rounded-xl font-semibold hover:opacity-90 transition text-sm sm:text-base"
                  >
                    {editingProject ? "Update" : "Add"} Project
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={handleCancelProjectEdit}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-lg sm:rounded-xl hover:border-primary transition text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Projects ({projects.length})</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden"
                  >
                    {project.images && project.images.length > 0 && (
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                    )}
                    <div className="p-4 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">
                        {project.category}
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.name}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{project.location}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="flex-1 px-3 sm:px-4 py-2 bg-primary text-black rounded-lg text-xs sm:text-sm font-semibold hover:opacity-90 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="flex-1 px-3 sm:px-4 py-2 border border-red-400 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-400/10 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


