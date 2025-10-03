import type { VercelRequest, VercelResponse } from '@vercel/node'

// Import the function directly instead of using relative imports
function getProjectBySlug(slug: string) {
  const { readdirSync, readFileSync } = require('fs')
  const { join } = require('path')
  const matter = require('gray-matter')
  
  try {
    const projectsDir = join(process.cwd(), 'src/data/projects')
    const files = readdirSync(projectsDir).filter((file: string) => file.endsWith('.mdx'))
    
    for (const file of files) {
      const filePath = join(projectsDir, file)
      const fileContent = readFileSync(filePath, 'utf8')
      const { data: frontmatter, content } = matter(fileContent)
      
      const fileSlug = file.replace('.mdx', '')
      if (fileSlug === slug) {
        return {
          ...frontmatter,
          slug: fileSlug,
          content,
          readingTime: Math.ceil(content.split(/\s+/).length / 200)
        }
      }
    }
    return null
  } catch (error) {
    console.error('Error reading projects:', error)
    return null
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const slug = req.query.slug as string
    
    if (!slug) {
      return res.status(400).json({ error: 'Project slug is required' })
    }
    
    const project = getProjectBySlug(slug)
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
}
