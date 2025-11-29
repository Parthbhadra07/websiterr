// Data service for managing gallery and projects using localStorage

const STORAGE_KEYS = {
  GALLERY: 'rr_designs_gallery',
  PROJECTS: 'rr_designs_projects',
  ADMIN_PASSWORD: 'rr_designs_admin_password',
};

// Default gallery data
const DEFAULT_GALLERY = [
  {
    id: 1,
    title: "Skyline Residences",
    location: "Kochi • Residential",
    image: "https://images.unsplash.com/photo-1616594039302-0f48c2df307d?q=80&w=1400",
  },
  {
    id: 2,
    title: "Harborfront Tower",
    location: "Bengaluru • Commercial",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400",
  },
  {
    id: 3,
    title: "Palm Grove Villa",
    location: "Goa • Luxury Villa",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400",
  },
  {
    id: 4,
    title: "Cascade Retreat",
    location: "Munnar • Boutique Stay",
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1400",
  },
  {
    id: 5,
    title: "Zenith Lofts",
    location: "Mumbai • Residential",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400",
  },
  {
    id: 6,
    title: "Atrium Exchange",
    location: "Hyderabad • Corporate",
    image: "https://images.unsplash.com/photo-1431578500526-4d9613015464?q=80&w=1400",
  },
  {
    id: 7,
    title: "Terracotta House",
    location: "Pune • Contemporary Home",
    image: "https://images.unsplash.com/photo-1616594039514-7ed9b3567ec4?q=80&w=1400",
  },
  {
    id: 8,
    title: "Spectrum Studios",
    location: "Delhi • Co-working",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400",
  },
];

// Default projects data
const DEFAULT_PROJECTS = [
  {
    id: 1,
    name: "Skyline Residences",
    category: "Residential",
    location: "Kochi, Kerala",
    area: "4,800 sqft",
    year: "2024",
    palette: "Warm neutrals, brushed brass, Calacatta marble",
    description: "A duplex apartment transformed into a light-filled retreat featuring bespoke joinery, layered lighting and handcrafted statement furniture.",
    video: "https://videos.pexels.com/video-files/30154917/12201209_2560_1440_25fps.mp4",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
    ],
  },
  {
    id: 2,
    name: "Harborfront Tower",
    category: "Commercial",
    location: "Bengaluru, India",
    area: "9,200 sqft",
    year: "2023",
    palette: "Charcoal, smoked oak, matte black metal",
    description: "An executive workspace with collaborative lounges, acoustic pods and a gallery-like reception that mirrors RR Designs' high-gloss detailing.",
    video: "https://videos.pexels.com/video-files/30154919/12201215_1920_1080_25fps.mp4",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600",
    ],
  },
  {
    id: 3,
    name: "Palm Grove Villa",
    category: "Luxury Villa",
    location: "Goa, India",
    area: "6,350 sqft",
    year: "2022",
    palette: "Terrazzo, cane, teak, sea-glass hues",
    description: "Indoor-outdoor living merges with a floating staircase, sunken conversation pits, and custom lighting designed to mimic coastal sunsets.",
    video: "https://videos.pexels.com/video-files/27476983/12119995_1920_1080_30fps.mp4",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=900",
      "https://images.unsplash.com/photo-1616594039302-0f48c2df307d?q=80&w=800",
    ],
  },
];

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    // Default password: admin123 (should be changed in production)
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123');
  }
};

// Gallery functions
export const getGalleryItems = () => {
  initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
  return JSON.parse(data || '[]');
};

export const addGalleryItem = (item) => {
  const items = getGalleryItems();
  const newItem = {
    ...item,
    id: Date.now(), // Simple ID generation
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
  return newItem;
};

export const updateGalleryItem = (id, updatedItem) => {
  const items = getGalleryItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem, id };
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
    return items[index];
  }
  return null;
};

export const deleteGalleryItem = (id) => {
  const items = getGalleryItems();
  const filtered = items.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
  return filtered;
};

// Projects functions
export const getProjects = () => {
  initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return JSON.parse(data || '[]');
};

export const addProject = (project) => {
  const projects = getProjects();
  const newProject = {
    ...project,
    id: Date.now(), // Simple ID generation
    images: project.images ? (Array.isArray(project.images) ? project.images : project.images.split(',').map(img => img.trim())) : [],
  };
  projects.push(newProject);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  return newProject;
};

export const updateProject = (id, updatedProject) => {
  const projects = getProjects();
  const index = projects.findIndex(project => project.id === id);
  if (index !== -1) {
    const images = updatedProject.images 
      ? (Array.isArray(updatedProject.images) 
          ? updatedProject.images 
          : updatedProject.images.split(',').map(img => img.trim()))
      : projects[index].images;
    projects[index] = { ...projects[index], ...updatedProject, id, images };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return projects[index];
  }
  return null;
};

export const deleteProject = (id) => {
  const projects = getProjects();
  const filtered = projects.filter(project => project.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
  return filtered;
};

// Authentication functions
export const verifyPassword = (password) => {
  initializeData();
  const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  return password === storedPassword;
};

export const setAdminPassword = (newPassword) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
};

// Initialize on import
initializeData();


