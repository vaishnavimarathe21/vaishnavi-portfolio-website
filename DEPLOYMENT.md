# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Build Test
- [ ] Run `npm run build` successfully
- [ ] Check for TypeScript errors with `npx tsc --noEmit`
- [ ] Test development server with `npm run dev`

### 2. Environment Variables Setup
Create these environment variables in Vercel dashboard:

#### Required:
- `VITE_SLACK_WEBHOOK_URL` - Your Slack webhook URL for contact form
- `VITE_SITE_URL` - Your Vercel domain (e.g., https://vaishnavi-marathe.vercel.app)

#### Optional:
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID

### 3. API Functions
- [x] Contact form API (`/api/submit-form`)
- [x] Projects API (`/api/projects`)
- [x] Individual project API (`/api/projects/[slug]`)

### 4. Static Assets
- [x] Images in `/public/images/`
- [x] Favicon and manifest files
- [x] Robots.txt

### 5. Configuration Files
- [x] `vercel.json` - Vercel configuration
- [x] `package.json` - Dependencies and scripts
- [x] `vite.config.ts` - Build configuration
- [x] `tailwind.config.js` - Styling configuration

## 🚀 Deployment Steps

### 1. Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 2. Or Deploy via GitHub
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

## 🔧 Post-Deployment

### 1. Test All Features
- [ ] Home page loads correctly
- [ ] About page displays properly
- [ ] Projects page shows all projects
- [ ] Project detail pages work
- [ ] Contact form submits successfully
- [ ] All external links open in new tabs
- [ ] Mobile responsiveness works

### 2. Performance Check
- [ ] Page load speeds are good
- [ ] Images load properly
- [ ] No console errors
- [ ] SEO meta tags are present

### 3. Domain Setup (Optional)
- [ ] Configure custom domain if needed
- [ ] Update `VITE_SITE_URL` environment variable
- [ ] Update meta tags with new domain

## 📝 Notes

- The site uses static data for projects (no database required)
- Contact form requires Slack webhook URL
- All API functions are serverless and will work on Vercel
- Build output goes to `dist/` directory
- Framework is detected as Vite automatically
