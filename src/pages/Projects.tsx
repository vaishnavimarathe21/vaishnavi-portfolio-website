import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Code2, Database, BarChart3, Image as ImageIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadProjects, type ProjectData } from '../utils/loadProjects'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Scroll to top when component mounts
    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }
    
    // Use setTimeout to ensure DOM is ready
    setTimeout(scrollToTop, 0)
    
    const fetchProjects = async () => {
      try {
        const projectData = await loadProjects()
        setProjects(projectData)
      } catch (error) {
        console.error('Error loading projects:', error)
        // Set fallback data
        setProjects([{
      id: 1,
          slug: 'error-project',
          title: 'Error Loading Projects',
          description: 'There was an error loading the projects',
          image: null,
          images: [],
          technologies: [],
          category: 'Other',
          date: '2024',
          status: 'Error',
          githubUrl: '#',
      liveUrl: null,
          features: [],
          content: ''
        }])
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categories = ["All", "Data Science", "Data Engineering", "Computer Vision"]

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

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

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 px-4"
          >
            My Projects
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4"
          >
            Explore my portfolio of data analysis, machine learning, and computer vision projects
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 px-4"
        >
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            const isActive = selectedCategory === category
            return (
              <motion.button
                key={category}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border ${
                  isActive 
                    ? 'bg-primary-500 text-white border-primary-500 shadow-lg' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-primary-600 dark:text-primary-400'
                }`} />
                <span className={`font-medium ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {category}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-300">Loading projects...</p>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && (
        <motion.div
            key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
            animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
            {filteredProjects.map((project) => {
            const CategoryIcon = getCategoryIcon(project.category)
            return (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600"
              >
                {/* Project Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 overflow-hidden">
                  {(project.image || (Array.isArray(project.images) && project.images.length > 0)) ? (
                    <>
                      <img 
                        src={project.image || (Array.isArray(project.images) ? project.images[0] : undefined)} 
                        alt={project.title}
                        className="w-full h-full object-contain object-center"
                      />
                      {/* Multiple images indicator */}
                      {Array.isArray(project.images) && project.images.length > 1 && (
                        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-primary-500/90 backdrop-blur-sm rounded-md px-2 py-1">
                          <ImageIcon className="w-3 h-3 text-white" />
                          <span className="text-xs font-medium text-white">{project.images.length} images</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                        <div className="absolute top-4 right-4 w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary-300 dark:bg-primary-700 rounded-full opacity-30"></div>
                      </div>
                      
                      {/* Main Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <CategoryIcon className="w-9 h-9 text-primary-600 dark:text-primary-400" />
                          </div>
                          {/* Floating elements */}
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                        </div>
                      </div>

                      {/* Image placeholder overlay */}
                      <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-md px-2 py-1">
                        <ImageIcon className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Preview</span>
                      </div>
                    </>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4">
                  {/* Header */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                          {project.status}
                        </span>
                      <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {(Array.isArray(project.features) ? project.features : []).slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start">
                          <div className="w-1 h-1 bg-primary-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                      {Array.isArray(project.features) && project.features.length > 2 && (
                        <li className="text-xs text-slate-500 dark:text-slate-500 ml-3">
                          +{project.features.length - 2} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {Array.isArray(project.technologies) && project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-500 text-xs font-medium rounded-md">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={`/projects/${project.slug}`}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 group"
                        >
                          <span className="text-xs font-medium">
                            View Details
                          </span>
                        </Link>
                      </motion.div>
                      
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 rounded-lg transition-colors duration-200 group"
                        >
                          <Github className="w-4 h-4 text-white dark:text-gray-900 group-hover:text-gray-100 dark:group-hover:text-gray-800 transition-colors duration-200" />
                          <span className="text-xs font-medium text-white dark:text-gray-900 group-hover:text-gray-100 dark:group-hover:text-gray-800 transition-colors duration-200">
                            Code
                          </span>
                        </motion.a>
                      )}
                    </div>
                    
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 rounded-lg transition-colors duration-200 group"
                        >
                        <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200" />
                        <span className="text-xs font-medium text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">
                          Demo
                        </span>
                        </motion.a>
                      )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 sm:p-8 text-white mx-4">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              I'm always excited to work on new projects and explore innovative solutions. 
              Let's discuss how we can work together!
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200 text-sm sm:text-base"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
