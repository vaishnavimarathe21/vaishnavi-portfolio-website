import { motion } from 'framer-motion'
import { ArrowDown, Code, Database, BarChart3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [displayedSkill, setDisplayedSkill] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const skills = [
    "Python Programming",
    "SQL Database Management", 
    "Data Visualization",
    "Machine Learning",
    "Statistical Analysis",
    "Tableau & Power BI"
  ]

  useEffect(() => {
    let timeout: number
    const currentSkill = skills[currentSkillIndex]
    
    if (!isDeleting && displayedSkill.length < currentSkill.length) {
      timeout = setTimeout(() => {
        setDisplayedSkill(currentSkill.slice(0, displayedSkill.length + 1))
      }, 100)
    } else if (isDeleting && displayedSkill.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedSkill(displayedSkill.slice(0, -1))
      }, 50)
    } else if (!isDeleting && displayedSkill.length === currentSkill.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && displayedSkill.length === 0) {
      setIsDeleting(false)
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
    }
    
    return () => clearTimeout(timeout)
  }, [displayedSkill, currentSkillIndex, isDeleting, skills])

  const skillsIcons = [
    { name: 'Python', icon: Code, color: 'text-blue-500' },
    { name: 'SQL', icon: Database, color: 'text-green-500' },
    { name: 'Data Analysis', icon: BarChart3, color: 'text-purple-500' },
    { name: 'Machine Learning', icon: Sparkles, color: 'text-pink-500' },
  ]

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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-xl"
            >
              {/* Profile Picture */}
              <img 
                src="/images/avatar.jpg" 
                alt="Vaishnavi Marathe" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Vaishnavi Marathe
            </span>
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed min-h-[2rem] flex items-center justify-center"
          >
            <div className="text-center">
              <span className="text-slate-700 dark:text-slate-300 font-medium">I Specialize in: </span>
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                {displayedSkill}
                <span className="animate-pulse text-primary-500">|</span>
              </span>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/projects"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-all duration-200"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Skills Icons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {skillsIcons.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <skill.icon className={`w-8 h-8 ${skill.color}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>


          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-slate-400 mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-6 h-6 text-slate-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="p-6">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                7.8/10
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                CGPA
              </div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                3+
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Projects Completed
              </div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                2
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Hackathons Participated
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
