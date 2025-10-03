import { getProjectBySlug } from '../index'
import type { VercelRequest, VercelResponse } from '@vercel/node'

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
