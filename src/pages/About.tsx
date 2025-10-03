import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Trophy, Code2, Database, BarChart3, Brain } from 'lucide-react'
import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])
  const education = [
    {
      institution: "R. C. Patel Institute of Technology, Shirpur - An Autonomous Institute",
      degree: "B.Tech in Artificial Intelligence and Machine Learning",
      period: "May 2022 - June 2026",
      grade: "CGPA: 7.8/10",
      location: "Shirpur, Maharashtra"
    },
    {
      institution: "Shri S. L. Mali Junior College, Taloda",
      degree: "HSC",
      period: "May 2021 - March 2022",
      grade: "81.50%",
      location: "Taloda, Maharashtra"
    }
  ]

  const experience = [
    {
      company: "R3 Systems India Private Limited",
      position: "Industrial Training and Internship",
      period: "July 2024 - August 2024",
      description: [
        "Completed comprehensive 3-week industrial training program in Core Java and Advanced Java technologies, focusing on enterprise-level application development.",
        "Developed hands-on expertise in object-oriented programming principles, exception handling, JDBC database connectivity, and web application architecture.",
        "Delivered end-to-end Child Vaccination Reminder System using Java, HTML, and CSS with automated SMS notifications and database integration for healthcare compliance."
      ]
    }
  ]

  const achievements = [
    {
      title: "Smart India Hackathon 2024",
      description: "Core team member for Krushi Tech - Mobile App for Direct Market Access for Farmers",
      location: "Shirpur, India",
      icon: Trophy
    },
    {
      title: "She Inspires Women Hackathon (Finalist)",
      description: "AI-Powered E-Learning Platform using AWS PartyRock",
      location: "MIT ADT University, Pune",
      icon: Trophy
    }
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
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-12">
            {/* Large Profile Picture */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center overflow-hidden shadow-2xl"
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
            
            {/* Name and Title */}
          <motion.h1 
            variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 px-4"
          >
              Vaishnavi Narottam Marathe
          </motion.h1>
            
          <motion.p 
            variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-600 dark:text-primary-400 mb-4 sm:mb-6 font-medium px-4"
          >
              Aspiring Machine Learning Engineer & AI/ML Student
          </motion.p>

            {/* My Journey Section */}
        <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto mb-12"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-center">
              My Journey
            </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed px-4">
                <p>
              I'm a final-year B.Tech student specializing in Artificial Intelligence and Machine Learning 
              at R.C. Patel Institute of Technology. My passion lies in data analysis and transforming 
              complex datasets into meaningful insights that drive decision-making.
            </p>
                <p>
              With hands-on experience in Python, SQL, and data visualization tools like Tableau, 
              I've developed several projects ranging from real-time data analysis to machine learning 
              applications. I'm particularly interested in applying my skills to solve real-world 
              problems in healthcare, agriculture, and business intelligence.
            </p>
                <p>
              Beyond academics, I actively participate in hackathons and competitions, where I've 
                  collaborated with teams to build innovative solutions. My goal is to become a proficient 
                  machine learning engineer who can bridge the gap between raw data and strategic insights.
            </p>
              </div>
          </motion.div>

            {/* Technical Skills Section */}
            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center">
              Technical Skills
            </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {/* Programming Languages */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Programming Languages
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Python</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">SQL</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">JavaScript</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">C++</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                  </div>
                </div>

                {/* Data Analysis & Visualization */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Data Analysis & Visualization
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Tableau</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Pandas</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">NumPy</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Matplotlib</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                  </div>
                </div>

                {/* Machine Learning & AI */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Machine Learning & AI
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Scikit-learn</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">TensorFlow</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Beginner</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">OpenCV</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">NLTK</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Beginner</span>
                    </div>
                  </div>
                </div>

                {/* Databases & Tools */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                      <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Databases & Tools
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">MySQL</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">PostgreSQL</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Git</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Jupyter</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                  </div>
                </div>

                {/* Web Development */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                      <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Web Development
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">HTML/CSS</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">React</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Node.js</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Beginner</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Flask</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Intermediate</span>
                    </div>
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mr-3">
                      <Trophy className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Soft Skills
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Problem Solving</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Team Collaboration</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Communication</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">Critical Thinking</span>
                      <span className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400">Advanced</span>
                    </div>
                  </div>
                    </div>
                  </div>
            </motion.div>
          </motion.div>
        </motion.div>


        {/* Experience */}
                    <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
                      viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center"
          >
            Experience
          </motion.h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                        {exp.company}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {exp.period}
                      </p>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-primary-600 dark:text-primary-400 mb-3 sm:mb-4">
                      {exp.position}
                    </p>
                    <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                      {Array.isArray(exp.description) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{exp.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
        </motion.div>

        {/* Education */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center"
          >
            Education
          </motion.h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                      {edu.institution}
                    </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {edu.period}
                      </p>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-primary-600 dark:text-primary-400 mb-2">
                      {edu.degree}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium">{edu.grade}</span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center"
          >
            Achievements & Hackathons
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-lg p-3 sm:p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <achievement.icon className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-2">
                      {achievement.description}
                    </p>
                    <p className="text-xs sm:text-sm text-primary-600 dark:text-primary-400">
                      {achievement.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default About
