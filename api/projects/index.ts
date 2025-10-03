import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export interface ProjectFrontmatter {
  title: string
  description: string
  image: string | null
  images?: string[]
  technologies: string[]
  category: string
  date: string
  status: string
  githubUrl: string
  liveUrl: string | null
  features: string[]
}

export interface Project extends ProjectFrontmatter {
  slug: string
  content: string
  readingTime: number
}

// Calculate reading time based on content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get all projects from MDX files
export function getAllProjects(): Project[] {
  try {
    const projectsDir = join(process.cwd(), 'src/data/projects')
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))
    
    const projects = files.map(file => {
      const filePath = join(projectsDir, file)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter, content } = matter(fileContent)
      
      // Generate slug from filename
      const slug = file.replace('.mdx', '')
      
      return {
        ...frontmatter as ProjectFrontmatter,
        slug,
        content,
        readingTime: calculateReadingTime(content)
      }
    })
    
    // Sort by date (newest first)
    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects()
  return projects.find(project => project.slug === slug) || null
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects()
  return projects.filter(project => project.status === 'Completed')
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  const projects = getAllProjects()
  return projects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  )
}

// Get all unique categories
export function getAllCategories(): string[] {
  const projects = getAllProjects()
  const categories = new Set(projects.map(project => project.category))
  return Array.from(categories).sort()
}

// Search projects
export function searchProjects(query: string): Project[] {
  const projects = getAllProjects()
  const lowercaseQuery = query.toLowerCase()
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.category.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  )
}

// API handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { featured, category, search, slug } = req.query
    
    // Handle specific project by slug
    if (slug && typeof slug === 'string') {
      const project = getProjectBySlug(slug)
      if (!project) {
        return res.status(404).json({ error: 'Project not found' })
      }
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(project)
    }
    
    // Handle featured projects filter
    if (featured === 'true') {
      const featuredProjects = getFeaturedProjects()
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(featuredProjects)
    }
    
    // Handle category filter
    if (category && typeof category === 'string') {
      const categoryProjects = getProjectsByCategory(category)
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(categoryProjects)
    }
    
    // Handle search
    if (search && typeof search === 'string') {
      const searchResults = searchProjects(search)
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(searchResults)
    }
    
    // Return all projects
    const allProjects = getAllProjects()
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(allProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}
