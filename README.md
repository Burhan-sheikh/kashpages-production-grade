# 🚀 KashPages - Production-Grade Landing Page Builder

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A professional, production-ready landing page builder platform inspired by WordPress. Features drag-and-drop functionality, real-time collaboration, role-based access control, and a comprehensive component library.

## ✨ Features

### 🎭 Role-Based Access Control

**👤 Guest Users**
- Browse homepage and explore published pages
- View About, Terms of Service, Privacy Policy
- Sign up and login functionality

**👨‍💼 Registered Users**
- All guest permissions
- Create unlimited landing pages
- Access to live page builder
- Manage and organize pages
- Profile and settings management

**👑 Administrators**
- All user permissions
- User management dashboard
- Page approval/rejection system
- Advanced analytics and insights
- System-wide settings control

### 🔧 Core Capabilities

#### Live Page Builder
- **WordPress-style Editor**: Intuitive drag-and-drop interface
- **Instant Preview**: Real-time visual feedback
- **Device Preview**: Test across desktop, tablet, and mobile
- **Undo/Redo**: Full history management
- **Auto-save**: Never lose your work

#### Pre-made Sections
- Hero sections with multiple variants
- Feature showcases
- Testimonial displays
- Pricing tables
- Contact forms
- FAQ accordions
- Call-to-action blocks
- Statistics counters
- Team member cards
- Portfolio galleries

#### Element Library
- Headings (H1-H6)
- Rich text editor
- Images with optimization
- Buttons with variants
- Form elements
- Video embeds
- Icons and dividers
- Custom HTML widgets

#### Real-time Collaboration
- Multiple users editing simultaneously
- Live cursor tracking
- User presence indicators
- Change notifications
- Conflict resolution

#### Template System
- 20+ professional templates
- Business templates
- Portfolio templates
- E-commerce templates
- Agency templates
- SaaS templates

#### Responsive Design
- Mobile-first approach
- Device-specific editing
- Breakpoint management
- Safe area optimization

#### Media Management
- Cloudinary integration
- Drag-and-drop upload
- Image optimization
- Asset library
- Batch operations

#### SEO Optimization
- Meta tags editor
- Open Graph support
- Structured data (JSON-LD)
- Sitemap generation
- Analytics integration

#### Version Control
- Automatic version tracking
- Compare versions
- Restore previous versions
- Change history

#### Export/Import
- JSON export for backups
- Page duplication
- Template creation
- Batch operations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with Server Components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations

### Drag & Drop
- **@dnd-kit**: Modern drag-and-drop toolkit
- Custom sortable components
- Touch-friendly interactions

### State Management
- **Zustand**: Lightweight state management
- Firebase real-time listeners
- Optimistic UI updates

### Backend & Database
- **Firebase Authentication**: Secure user auth
- **Cloud Firestore**: Real-time database
- **Firebase Realtime Database**: Collaboration sync
- **Firebase Storage**: Media storage
- **Cloud Functions**: Serverless backend

### Media & Assets
- **Cloudinary**: Image optimization and CDN
- **Next/Image**: Automatic image optimization

### Forms & Validation
- **React Hook Form**: Performant forms
- **Zod**: Schema validation

### UI Components
- **Lucide React**: Icon library
- **Sonner/React Hot Toast**: Notifications
- Custom component system

## 📦 Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Firebase project
- Cloudinary account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Burhan-sheikh/kashpages-production-grade.git
cd kashpages-production-grade
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... (see .env.example for all variables)
```

4. **Set up Firebase**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
- Enable Authentication (Email/Password, Google)
- Create Firestore database
- Enable Realtime Database
- Add your domain to authorized domains

5. **Configure Cloudinary**
- Create account at [Cloudinary](https://cloudinary.com)
- Get your cloud name, API key, and secret
- Add credentials to `.env.local`

6. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker

```bash
docker build -t kashpages .
docker run -p 3000:3000 kashpages
```

## 📂 Project Structure

```
kashpages-production-grade/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── (marketing)/       # Public marketing pages
│   │   ├── api/               # API routes
│   │   └── builder/           # Page builder interface
│   ├── components/            # React components
│   │   ├── builder/          # Builder-specific components
│   │   ├── common/           # Shared components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI primitives
│   ├── lib/                   # Library code
│   │   ├── firebase/         # Firebase configuration
│   │   ├── cloudinary/       # Cloudinary setup
│   │   └── utils/            # Utility functions
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Zustand stores
│   ├── types/                 # TypeScript types
│   ├── config/                # App configuration
│   └── styles/                # Global styles
├── public/                    # Static assets
├── docs/                      # Documentation
└── tests/                     # Test files
```

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Code Quality

- **ESLint**: Enforces code style
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks (planned)

## 🔐 Security

- Firebase Security Rules configured
- Role-based access control
- Input sanitization
- XSS protection
- CSRF tokens
- Rate limiting

## 🎨 Design System

### Colors
- Primary: Blue scale (50-950)
- Secondary: Purple scale (50-950)
- Semantic: Success, Warning, Error, Info

### Typography
- Font: Inter (body), Cal Sans (display)
- Scale: text-xs to text-9xl

### Spacing
- Consistent 4px base unit
- Responsive spacing utilities

### Animations
- Smooth transitions
- Micro-interactions
- Loading states

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Burhan Sheikh**
- GitHub: [@Burhan-sheikh](https://github.com/Burhan-sheikh)
- Location: Jammu, Kashmir, India

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Firebase](https://firebase.google.com/) for backend infrastructure
- [Vercel](https://vercel.com/) for hosting
- [Cloudinary](https://cloudinary.com/) for media management
- All open-source contributors

## 📞 Support

For support, email support@kashpages.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] AI-powered content suggestions
- [ ] Advanced animation builder
- [ ] Custom domain support
- [ ] White-label options
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Figma plugin
- [ ] WordPress import/export

---

**Built with ❤️ in Kashmir**