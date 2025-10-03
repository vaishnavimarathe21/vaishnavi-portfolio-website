import { motion } from 'framer-motion'
import { Code, Database, BarChart3, Sparkles, Award, Users, Calendar, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [displayedSkill, setDisplayedSkill] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [codechefData, setCodechefData] = useState({
    rating: 846,
    problemsSolved: 2356,
    contests: 13,
    stars: 1,
    loading: false
  })

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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchCodeChefData = async () => {
      setCodechefData(prev => ({ ...prev, loading: true }))
      try {
        const response = await fetch('https://codechef-api.vercel.app/rcp_221107017')
        if (response.ok) {
          const data = await response.json()
          setCodechefData({
            rating: data.rating || 846,
            problemsSolved: data.fullySolved || 2356,
            contests: data.contestParticipated || 13,
            stars: data.stars || 1,
            loading: false
          })
        }
      } catch (error) {
        setCodechefData(prev => ({ ...prev, loading: false }))
      }
    }
    fetchCodeChefData()
  }, [])

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
              className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-xl"
            >
              {/* Profile Picture */}
              <img 
                src="/images/avatar.jpg" 
                alt="Vaishnavi Marathe" 
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onDrag={(e) => e.preventDefault()}
                onDragEnd={(e) => e.preventDefault()}
                draggable={false}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 px-4"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Vaishnavi Marathe
            </span>
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed min-h-[2rem] flex items-center justify-center px-4"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4"
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
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 px-4"
          >
            {skillsIcons.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <skill.icon className={`w-8 h-8 ${skill.color}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>


        </motion.div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Technical skills and tools I work with
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { name: 'Python', icon: Code, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900' },
              { name: 'SQL', icon: Database, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900' },
              { name: 'Data Analysis', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900' },
              { name: 'Machine Learning', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900' },
              { name: 'AWS', icon: Award, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900' },
              { name: 'React', icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900' },
              { name: 'Streamlit', icon: Calendar, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900' },
              { name: 'OpenCV', icon: BookOpen, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900' }
            ].map((skill, _index) => (
              <div key={skill.name} className={`${skill.bg} p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-200`}>
                <skill.icon className={`w-8 h-8 ${skill.color} mx-auto mb-3`} />
                <h3 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
          >
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                7.8/10
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                CGPA
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                3+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Projects Completed
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                2
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Hackathons Participated
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Developer Profile
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Competitive programming and problem-solving journey
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/codechef.jpeg" 
                  alt="CodeChef" 
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    CodeChef Profile
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Competitive Programming
                  </p>
                </div>
              </div>
              <a
                href="https://www.codechef.com/users/rcp_221107017"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                View Profile
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : codechefData.rating}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Rating</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : codechefData.problemsSolved.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Problems</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : codechefData.contests}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Contests</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : `${codechefData.stars}★`}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Stars</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Passionate about data science and technology
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  AIML Enthusiast
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  I'm a passionate data science student with a strong foundation in Python, SQL, and machine learning. 
                  I love turning complex data into meaningful insights and building solutions that make a difference.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-300">Currently pursuing Artificial Intelligence and Machine Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-300">Active in competitive programming</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-300">Building real-world projects</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center">
                  <img 
                    src="/images/avatar.jpg" 
                    alt="Vaishnavi Marathe" 
                    className="w-40 h-40 rounded-full object-cover"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onDrag={(e) => e.preventDefault()}
                    onDragEnd={(e) => e.preventDefault()}
                    draggable={false}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/about"
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Learn More About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              I'm always excited to collaborate on new projects and explore innovative solutions. 
              Let's discuss how we can work together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
              >
                View My Projects
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-600 rounded-lg font-medium transition-all duration-200"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
