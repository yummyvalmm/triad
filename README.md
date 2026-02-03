# Lyne Digital Studio

> Premium digital agency website built with React, TypeScript, and Tailwind CSS

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff)](https://vitejs.dev/)

![Lyne Digital Studio](public/images/hero.webp)

---

## ✨ Features

- 🎨 **Comprehensive Design System** - Consistent colors, typography, and spacing
- ⚡ **Blazing Fast** - Built with Vite for optimal performance
- 📱 **Fully Responsive** - Mobile-first design approach
- ♿ **Accessible** - WCAG guidelines and semantic HTML
- 🎭 **Smooth Animations** - Framer Motion for fluid interactions
- 🔒 **Type Safe** - Full TypeScript coverage
- 🎯 **SEO Optimized** - Meta tags, structured data, and semantic markup

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/lyne-digital-studio.git
cd lyne-digital-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173 to see your site.

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |

---

## 🛠️ Tech Stack

- **Framework**: [React 18.3](https://react.dev/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Build Tool**: [Vite 6.2](https://vitejs.dev/)
- **Routing**: [React Router 7.12](https://reactrouter.com/)
- **State Management**: [Zustand 5.0](https://docs.pmnd.rs/zustand/)
- **Animations**: [Framer Motion 11.0](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis 1.3](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons)
- **Testing**: [Vitest 4.0](https://vitest.dev/), [Testing Library](https://testing-library.com/)

---

## 📁 Project Structure

```
lyne-digital-studio/
├── public/                  # Static assets
│   └── images/             # Image files
├── src/
│   ├── components/         # React components
│   │   ├── home/          # Homepage sections
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   └── ui/            # Reusable UI components
│   ├── constants/          # App configuration and constants
│   ├── data/              # Static content data
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layout wrappers
│   ├── pages/             # Route pages
│   ├── store/             # Zustand state management
│   ├── utils/             # Utility functions
│   ├── types.ts           # TypeScript type definitions
│   ├── index.css          # Global styles and design system
│   └── index.tsx          # App entry point
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## 🎨 Design System

### Colors
- **Brand Red** `#FF2E00` - Primary CTAs
- **Coral Accent** `#FF6B5B` - Links and highlights
- **Deep Black** `#050505` - Backgrounds
- **Grayscale** - 11-step system for text and UI

### Typography
- **Display** - Space Grotesk (headers)
- **Body** - Manrope (content)
- **Mono** - Space Grotesk (code)

📚 **Full Design System Documentation**: See [design_system_reference.md](brain/design_system_reference.md)

---

## 🧩 Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Hero` | `components/home/Hero.tsx` | Landing page hero section |
| `Navbar` | `components/layout/Navbar.tsx` | Site navigation |
| `Footer` | `components/layout/Footer.tsx` | Contact form and footer |
| `Portfolio` | `components/home/Portfolio.tsx` | Project showcase |
| `Preloader` | `components/ui/Preloader.tsx` | Loading animation |
| `Reveal` | `components/ui/Reveal.tsx` | Scroll-triggered animations |

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
VITE_GOOGLE_SCRIPT_URL=your_form_endpoint_here
```

### Customization

- **Brand Colors**: Edit `src/index.css` (lines 6-52)
- **Typography**: Edit `tailwind.config.js` (lines 12-17, 52-71)
- **Spacing**: Edit `tailwind.config.js` (lines 76-82)
- **Content Data**: Edit files in `src/data/`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

1. Build: `npm run build`
2. Deploy the `dist/` folder

Or connect your GitHub repository for automatic deployments.

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## 📚 Documentation

- 📖 **[Quick Start Guide](brain/quick_start_guide.md)** - Developer onboarding
- 🎨 **[Design System Reference](brain/design_system_reference.md)** - Visual language guide
- 📋 **[Implementation Checklists](brain/implementation_checklists.md)** - Improvement roadmap
- 🔍 **[Professional Analysis](brain/professional_analysis.md)** - Technical audit

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Design inspiration from modern digital agencies
- Icons by [Lucide](https://lucide.dev/) and [Tabler](https://tabler.io/icons)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

## 📞 Contact

**Lyne Digital Studio**  
Website: [lyne.studio](https://lyne.studio)  
Email: contact@lyne.studio

---

<div align="center">
Made with ❤️ by Lyne Digital Studio
</div>
