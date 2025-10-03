# Vaishnavi Marathe - Portfolio Website

A modern, responsive portfolio website showcasing my journey as an AIML enthusiast, competitive programmer, and data science student. Built with React, TypeScript, and Tailwind CSS.

🌐 **Live Website:** [https://vaishnavimarathe.vercel.app](https://vaishnavimarathe.vercel.app)

## 🌟 Features

### 🎨 Modern Design
- **Responsive Layout** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Smooth Animations** - Framer Motion powered animations throughout
- **Professional UI** - Clean, modern interface with excellent UX
- **Mobile-First Approach** - Fully optimized for mobile devices

### 📱 Pages & Sections

#### 🏠 Homepage
- **Hero Section** - Animated introduction with typing effect
- **Skills Showcase** - Interactive skill cards with hover effects
- **Quick Stats** - Academic achievements and project metrics
- **Developer Profile** - Live CodeChef statistics integration
- **About Preview** - Personal introduction with call-to-action
- **Contact CTA** - Professional collaboration invitation

#### 📊 Projects Page
- **Interactive Filtering** - Filter projects by category (Data Science, Data Engineering, Computer Vision)
- **Project Cards** - Detailed project information with:
  - Beautiful image placeholders with category icons
  - Technology stacks and key features
  - GitHub and live demo links
  - Status indicators and completion dates
- **Responsive Grid** - Adaptive layout for different screen sizes
- **Detailed Project Views** - Comprehensive project documentation with MDX content

#### 👤 About Page
- **Personal Story** - Detailed background and journey
- **Skills & Technologies** - Comprehensive technical expertise
- **Education & Experience** - Academic and professional background
- **Achievements** - Awards, certifications, and milestones

#### 📞 Contact Page
- **Contact Form** - Professional contact form with validation
- **Social Links** - Direct links to professional profiles
- **Location & Availability** - Contact information and availability status

#### 💻 Developer Page
- **Currently Blank** - Ready for future content expansion

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with excellent IntelliSense
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing for SPA experience

### Content Management
- **MDX** - Markdown with JSX for rich project documentation
- **Gray Matter** - Frontmatter parsing for project metadata
- **Markdown-to-JSX** - Client-side markdown rendering

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Hookform Resolvers** - Validation integration

### Icons & Assets
- **Lucide React** - Beautiful, customizable icons
- **Custom Images** - Professional photos and project assets

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **TypeScript Config** - Strict type checking and modern JS features
- **Terser** - Advanced JavaScript minification

### Performance & Analytics
- **Vercel Analytics** - Website analytics and insights
- **Vercel Speed Insights** - Performance monitoring
- **Code Splitting** - Lazy loading for optimal performance
- **Bundle Optimization** - Manual chunking for better caching

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaishnavimarathe21/vaishnavi-portfolio-website.git
   cd vaishnavi-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
vaishnavi-portfolio-website/
├── public/
│   ├── images/
│   │   ├── avatar.jpg          # Profile picture
│   │   └── codechef.jpeg       # CodeChef logo
│   ├── favicon.svg             # Website favicon
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO robots file
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ScrollToTopButton.tsx # Scroll to top functionality
│   │   └── MDXContentRenderer.tsx # MDX content rendering
│   ├── pages/
│   │   ├── Home.tsx            # Homepage with all sections
│   │   ├── About.tsx           # About page
│   │   ├── Projects.tsx        # Projects showcase
│   │   ├── ProjectDetail.tsx   # Individual project details
│   │   ├── Contact.tsx         # Contact form
│   │   └── Developer.tsx       # Developer profile (blank)
│   ├── data/
│   │   └── projects/           # MDX project files
│   │       ├── california-housing-dashboard.mdx
│   │       ├── aws-cloud-data-pipeline.mdx
│   │       └── real-time-height-measurement.mdx
│   ├── utils/
│   │   └── loadProjects.ts     # Project data loading utilities
│   ├── types/
│   │   └── mdx.d.ts            # MDX type definitions
│   ├── App.tsx                 # Main app component with lazy loading
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── api/
│   ├── projects/
│   │   ├── index.ts            # Projects API endpoint
│   │   └── [slug]/
│   │       └── index.ts        # Individual project API endpoint
│   └── submit-form/
│       └── index.ts            # Contact form API endpoint
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration with optimization
├── vercel.json                 # Vercel deployment config
└── env.example                  # Environment variables template
```

## 🎯 Key Features Explained

### 🔄 Dynamic Content
- **CodeChef Integration** - Live data fetching from CodeChef API
- **Animated Typing Effect** - Dynamic skill display on homepage
- **Interactive Filtering** - Real-time project filtering by category
- **MDX Project Documentation** - Rich content with frontmatter metadata

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized for mobile devices
- **Flexible Grid System** - Adaptive layouts for all screen sizes
- **Touch-Friendly Interface** - Optimized for touch interactions
- **Progressive Enhancement** - Works on all devices

### ⚡ Performance Optimizations
- **Code Splitting** - Lazy loading with React.lazy() and Suspense
- **Bundle Optimization** - Manual chunking for better caching
- **Image Optimization** - Optimized images and lazy loading
- **Smooth Animations** - Hardware-accelerated transitions
- **Tree Shaking** - Unused code elimination

### 🔒 Security Features
- **Right-Click Protection** - Disabled context menu across the site
- **Image Protection** - Disabled drag, drop, and save on profile images
- **Form Validation** - Client and server-side validation
- **XSS Protection** - Sanitized user inputs

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `Vite`
3. Deploy automatically on every push to main branch

### Other Platforms
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Use GitHub Actions for automated deployment
- **AWS S3** - Upload `dist` contents to S3 bucket

## 🎨 Customization

### Adding New Projects
1. Create a new `.mdx` file in `src/data/projects/`
2. Add frontmatter with project metadata:
   ```yaml
   ---
   title: "Project Title"
   description: "Project description"
   technologies: ["Tech1", "Tech2"]
   category: "Data Science"
   date: "2024-01-01"
   status: "Completed"
   githubUrl: "https://github.com/username/repo"
   liveUrl: "https://project-url.com"
   features: ["Feature 1", "Feature 2"]
   ---
   ```
3. Add project content in markdown format

### Updating Personal Information
1. **Homepage**: Edit `src/pages/Home.tsx`
2. **About Page**: Edit `src/pages/About.tsx`
3. **Contact Info**: Edit `src/pages/Contact.tsx`

### Styling Changes
1. **Colors**: Modify `tailwind.config.js` for theme colors
2. **Components**: Edit individual component files
3. **Global Styles**: Update `src/index.css`

## 📊 API Integration

### CodeChef API
- **Endpoint**: `https://codechef-api.vercel.app/rcp_221107017`
- **Data**: Rating, problems solved, contests participated, stars
- **Fallback**: Default values if API is unavailable

### Contact Form API
- **Endpoint**: `/api/submit-form`
- **Method**: POST
- **Fields**: name, email, subject, message

### Projects API
- **Endpoint**: `/api/projects`
- **Method**: GET
- **Features**: Filtering, searching, pagination

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📊 Bundle Optimization

The project uses advanced optimization techniques:

- **Code Splitting**: Pages load on-demand
- **Manual Chunking**: Vendor libraries separated
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser with advanced options
- **Gzip Compression**: Automatic compression

**Bundle Sizes:**
- Main App: 196.84 kB (62.25 kB gzipped)
- React Vendor: 42.43 kB (15.01 kB gzipped)
- Framer Motion: 115.84 kB (37.17 kB gzipped)
- Individual Pages: 0.30-19.22 kB each

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Vaishnavi Narottam Marathe**
- 📧 **Email:** [marathekhushi6@gmail.com](mailto:marathekhushi6@gmail.com)
- 💼 **LinkedIn:** [Connect with me on LinkedIn](https://www.linkedin.com/in/vmarathe21)
- 🐙 **GitHub:** [@vaishnavimarathe21](https://github.com/vaishnavimarathe21)
- 🏆 **CodeChef:** [rcp_221107017](https://www.codechef.com/users/rcp_221107017)

## 🎓 Education & Experience

### Education
- **B.Tech in Artificial Intelligence and Machine Learning**
  - R. C. Patel Institute of Technology, Shirpur (May 2022 - June 2026)
  - CGPA: 7.8/10
- **HSC** - Shri S. L. Mali Junior College, Taloda (May 2021 - March 2022)
  - Grade: 81.50%

### Experience
- **Industrial Training and Internship** at R3 Systems India Private Limited
  - Period: July 2024 - August 2024
  - Focus: Core Java and Advanced Java technologies
  - Project: Child Vaccination Reminder System

### Achievements
- **Smart India Hackathon 2024** - Core team member for Krushi Tech (Mobile App for Direct Market Access for Farmers)
- **She Inspires Women Hackathon (Finalist)** - AI-Powered E-Learning Platform using AWS PartyRock

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Vite** - For the fast build tool
- **Lucide** - For beautiful icons
- **Vercel** - For seamless deployment and analytics

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Vaishnavi Marathe