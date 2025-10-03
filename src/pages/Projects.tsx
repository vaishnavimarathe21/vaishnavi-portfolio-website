import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Code2, Database, BarChart3 } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "California Housing Dashboard",
      description: "Interactive dashboard that predicts California housing prices using Linear, Polynomial, Ridge, and Lasso models. Provides rich visualizations like geospatial maps, partial dependence plots, and SHAP explanations for interpretability.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "Streamlit", "Pandas", "NumPy", "Matplotlib"],
      features: [
        "Multiple ML models for price prediction",
        "Interactive geospatial visualizations",
        "SHAP explanations for model interpretability",
        "Custom data upload and feature engineering",
        "Download predictions and model coefficients"
      ],
      githubUrl: "https://github.com/vaishnavimarathe21",
      liveUrl: null,
      category: "Data Science",
      date: "2024",
      status: "Completed"
    },
    {
      id: 2,
      title: "AWS Cloud Data Pipeline",
      description: "Scalable data pipeline on AWS to ingest, process, and analyze over 200,000 records of YouTube data from 10+ regions. Transformed raw data into structured format using AWS Glue ETL.",
      image: "/api/placeholder/600/400",
      technologies: ["AWS S3", "AWS Glue", "AWS Lambda", "AWS Athena", "QuickSight"],
      features: [
        "Processed 200,000+ YouTube records",
        "90% reduction in data redundancy",
        "60% faster query performance",
        "Dynamic QuickSight dashboards",
        "Multi-region data analysis"
      ],
      githubUrl: "https://github.com/vaishnavimarathe21/Data-Engineering-Youtube-Data-Analysis",
      liveUrl: null,
      category: "Data Engineering",
      date: "2024",
      status: "Completed"
    },
    {
      id: 3,
      title: "Real-Time Height Measurement System",
      description: "Computer vision application to measure height in real-time using MediaPipe, achieving over 95% detection confidence for 33 body landmarks. Built with React UI processing video at 30 FPS.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "OpenCV", "MediaPipe", "React", "Computer Vision"],
      features: [
        "95%+ detection confidence",
        "Real-time 30 FPS processing",
        "Smart calibration module",
        "±2cm measurement accuracy",
        "Kalman filter for data smoothing"
      ],
      githubUrl: "https://github.com/vaishnavimarathe21/Real-Time-Height-Measurement-System.git",
      liveUrl: null,
      category: "Computer Vision",
      date: "2024",
      status: "Completed"
    }
  ]

  const categories = ["All", "Data Science", "Data Engineering", "Computer Vision"]

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
            return (
              <motion.button
                key={category}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200 dark:border-slate-700"
              >
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {category}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {projects.map((project) => {
            const CategoryIcon = getCategoryIcon(project.category)
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Project Image */}
                <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                  <CategoryIcon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                </div>

                {/* Project Content */}
                <div className="p-3 sm:p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed text-xs sm:text-sm">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 2 && (
                        <li className="text-xs text-slate-500 dark:text-slate-500">
                          +{project.features.length - 2} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-500 text-xs rounded-md">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{project.date}</span>
                    </div>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200"
                        >
                          <Github className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

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
