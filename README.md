# RR Designs - Interior Design Portfolio Website

A modern, responsive interior design portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern, elegant UI design
- 📱 Fully responsive layout
- 🖼️ Interactive gallery and projects showcase
- 👨‍💼 Admin panel for managing gallery and projects
- 📧 Contact form with email integration
- 🎬 Smooth animations using Framer Motion
- 🎯 SEO-friendly structure

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Express.js** - Backend server for email functionality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interior-main.git
cd interior-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. (Optional) Start the backend server for email functionality:
```bash
npm run server
```

Or run both simultaneously:
```bash
npm run dev:all
```

## Project Structure

```
interior-main/
├── src/
│   ├── components/     # Reusable React components
│   ├── Pages/          # Page components
│   ├── routes/         # Routing configuration
│   ├── utils/          # Utility functions and services
│   └── assets/         # Images and static assets
├── public/             # Public assets
├── server.js           # Express backend server
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Start backend server
- `npm run dev:all` - Run both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Admin Panel

Access the admin panel at `/admin` to manage:
- Gallery items
- Projects

Default password: `admin123` (change in production!)

## Deployment

Build the project for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files.

## License

This project is private and proprietary.

## Contact

For inquiries, visit the contact page or email through the website.
