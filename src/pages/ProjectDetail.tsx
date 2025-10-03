import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, ArrowLeft, Code2, Database, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadProject, type ProjectData } from '../utils/loadProjects'
import { MDXContentRenderer } from '../components/MDXContentRenderer'

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo(0, 0)
    
    const fetchProject = async () => {
      if (slug) {
        const projectData = await loadProject(slug)
        setProject(projectData)
      }
      setLoading(false)
    }
    fetchProject()
  }, [slug])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Data Science":
        return BarChart3
      case "Data Engineering":
        return Database
      case "Computer Vision":
        return Code2
      default:
        return Code2
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    )
  }

  const CategoryIcon = getCategoryIcon(project.category)

  // Get all images (main image + additional images)
  const allImages = project.images && project.images.length > 0 
    ? project.images 
    : project.image 
      ? [project.image] 
      : []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <CategoryIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full">
                {project.category}
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {project.title}
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>{project.date}</span>
            </div>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
              {project.status}
            </span>
            {project.readingTime && (
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>{project.readingTime} min read</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Project Images */}
        {allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              {/* Main Image Display */}
              <div className="relative">
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-64 sm:h-80 object-contain bg-slate-50 dark:bg-slate-700"
                />
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-2 rounded-full transition-colors duration-200 touch-manipulation"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 sm:p-2 rounded-full transition-colors duration-200 touch-manipulation"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 touch-manipulation ${
                          index === currentImageIndex
                            ? 'border-primary-500'
                            : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Content */}
        {project.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Project Details</h2>
              <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <MDXContentRenderer content={project.content} />
            </div>
            
            {/* Additional Project Information */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm sm:text-base">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    Technical Highlights
                  </h4>
                  <ul className="text-xs sm:text-sm space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Modern architecture and design patterns</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Comprehensive error handling and validation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Performance optimization techniques</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Scalable and maintainable codebase</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center text-sm sm:text-base">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    Key Achievements
                  </h4>
                  <ul className="text-xs sm:text-sm space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Production-ready implementation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Comprehensive testing coverage</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Detailed documentation and guides</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span>Active maintenance and updates</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                <p className="text-primary-800 dark:text-primary-200 text-xs sm:text-sm">
                  <strong>Note:</strong> For complete technical documentation, code examples, installation guides, 
                  and detailed implementation walkthroughs, please visit the GitHub repository linked above.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
