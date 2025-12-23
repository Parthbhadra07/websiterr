// Data service for managing gallery and projects using localStorage

const STORAGE_KEYS = {
  GALLERY: 'rr_designs_gallery',
  PROJECTS: 'rr_designs_projects',
  ADMIN_PASSWORD: 'rr_designs_admin_password',
};

// Default gallery data with categories and subcategories
const DEFAULT_GALLERY = [
  // Commercial - Office
  {
    id: 1,
    title: "Modern Office Space",
    location: "Bengaluru",
    category: "Commercial",
    subcategory: "Office",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400"],
  },
  {
    id: 2,
    title: "Executive Workspace",
    location: "Mumbai",
    category: "Commercial",
    subcategory: "Office",
    images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400"],
  },
  // Commercial - Mart
  {
    id: 3,
    title: "Shopping Mart Interior",
    location: "Delhi",
    category: "Commercial",
    subcategory: "Mart",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400"],
  },
  // Commercial - Store
  {
    id: 4,
    title: "Boutique Store Design",
    location: "Hyderabad",
    category: "Commercial",
    subcategory: "Store",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400"],
  },
  // Residential - Bedroom
  {
    id: 5,
    title: "Luxury Master Bedroom",
    location: "Kochi",
    category: "Residential",
    subcategory: "Bedroom",
    images: ["https://images.unsplash.com/photo-1616594039302-0f48c2df307d?q=80&w=1400"],
  },
  {
    id: 6,
    title: "Contemporary Bedroom",
    location: "Mumbai",
    category: "Residential",
    subcategory: "Bedroom",
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400"],
  },
  // Residential - Kitchen
  {
    id: 7,
    title: "Modern Kitchen Design",
    location: "Pune",
    category: "Residential",
    subcategory: "Kitchen",
    images: ["https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1400"],
  },
  {
    id: 8,
    title: "Luxury Kitchen",
    location: "Goa",
    category: "Residential",
    subcategory: "Kitchen",
    images: ["https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1400"],
  },
  // Residential - Hall
  {
    id: 9,
    title: "Elegant Living Hall",
    location: "Bengaluru",
    category: "Residential",
    subcategory: "Hall",
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400"],
  },
  {
    id: 10,
    title: "Spacious Living Room",
    location: "Delhi",
    category: "Residential",
    subcategory: "Hall",
    images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1400"],
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
  const items = JSON.parse(data || '[]');
  // Migrate old items with 'image' property to 'images' array
  // Also migrate old items without category/subcategory
  const migrated = items.map(item => {
    let updated = { ...item };
    if (item.image && !item.images) {
      updated.images = [item.image];
    }
    // If no category, try to infer from location or set default
    if (!updated.category) {
      const location = (updated.location || '').toLowerCase();
      if (location.includes('commercial') || location.includes('office') || location.includes('mart') || location.includes('store')) {
        updated.category = 'Commercial';
        if (location.includes('office')) updated.subcategory = 'Office';
        else if (location.includes('mart')) updated.subcategory = 'Mart';
        else if (location.includes('store')) updated.subcategory = 'Store';
        else updated.subcategory = 'Office';
      } else {
        updated.category = 'Residential';
        if (location.includes('bedroom')) updated.subcategory = 'Bedroom';
        else if (location.includes('kitchen')) updated.subcategory = 'Kitchen';
        else if (location.includes('hall') || location.includes('living')) updated.subcategory = 'Hall';
        else updated.subcategory = 'Hall';
      }
    }
    if (!updated.subcategory) {
      updated.subcategory = updated.category === 'Commercial' ? 'Office' : 'Hall';
    }
    return updated;
  });
  // Save migrated data if changes were made
  if (JSON.stringify(items) !== JSON.stringify(migrated)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(migrated));
  }
  return migrated;
};

export const addGalleryItem = (item) => {
  const items = getGalleryItems();
  const newItem = {
    ...item,
    id: Date.now(), // Simple ID generation
    images: item.images ? (Array.isArray(item.images) ? item.images : item.images.split(',').map(img => img.trim()).filter(img => img)) : (item.image ? [item.image] : []),
    category: item.category || 'Residential',
    subcategory: item.subcategory || 'Hall',
  };
  // Remove old 'image' property if it exists
  if (newItem.image) {
    delete newItem.image;
  }
  items.push(newItem);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
  return newItem;
};

export const updateGalleryItem = (id, updatedItem) => {
  const items = getGalleryItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    const images = updatedItem.images 
      ? (Array.isArray(updatedItem.images) 
          ? updatedItem.images 
          : updatedItem.images.split(',').map(img => img.trim()).filter(img => img))
      : (updatedItem.image ? [updatedItem.image] : items[index].images || []);
    const updated = { ...items[index], ...updatedItem, id, images };
    // Remove old 'image' property if it exists
    if (updated.image) {
      delete updated.image;
    }
    items[index] = updated;
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


