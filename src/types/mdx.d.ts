declare module '*.mdx' {
  export const frontmatter: {
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
  const MDXComponent: React.ComponentType
  export default MDXComponent
}
