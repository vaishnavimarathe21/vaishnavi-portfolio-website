import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Developer = () => {
  const [codechefData, setCodechefData] = useState({
    rating: 846,
    problemsSolved: 2356,
    contests: 13,
    globalRank: 182686,
    countryRank: 174988,
    stars: 1,
    loading: false,
    error: null as string | null
  })

  useEffect(() => {
    const fetchCodeChefData = async () => {
      setCodechefData(prev => ({ ...prev, loading: true, error: null }))
      try {
        const response = await fetch('https://codechef-api.vercel.app/rcp_221107017')
        if (response.ok) {
          const data = await response.json()
          setCodechefData({
            rating: data.rating || 846,
            problemsSolved: data.fullySolved || 2356,
            contests: data.contestParticipated || 13,
            globalRank: data.globalRank || 182686,
            countryRank: data.countryRank || 174988,
            stars: data.stars || 1,
            loading: false,
            error: null
          })
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching CodeChef data:', error)
        setCodechefData(prev => ({ 
          ...prev, 
          loading: false, 
          error: null 
        }))
      }
    }
    fetchCodeChefData()
  }, [])

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
            Developer Profile
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto px-4"
          >
            My journey in competitive programming and problem-solving
          </motion.p>
        </motion.div>

        {/* CodeChef Profile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center"
          >
            Competitive Programming
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <img 
                    src="/images/codechef.jpeg" 
                    alt="CodeChef" 
                    className="w-8 h-8 rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                    CodeChef Profile
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    Competitive Programming & Problem Solving
                  </p>
                </div>
              </div>
              <a
                href="https://www.codechef.com/users/rcp_221107017"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base self-start sm:self-auto"
              >
                View Profile
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
              <div className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : codechefData.rating}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Current Rating</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : codechefData.problemsSolved.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Problems Solved</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : codechefData.contests}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Contests</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : `${codechefData.stars}★`}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Star Rating</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : `#${codechefData.globalRank.toLocaleString()}`}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Global Rank</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {codechefData.loading ? '...' : `#${codechefData.countryRank.toLocaleString()}`}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Country Rank</div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3">Recent Achievements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-lg">
                  <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Problem Solver</div>
                  <div className="text-xs text-yellow-700 dark:text-yellow-300">Diamond Badge - 1000+ Problems</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-lg">
                  <div className="text-sm font-semibold text-orange-800 dark:text-orange-200">Contest Contender</div>
                  <div className="text-xs text-orange-700 dark:text-orange-300">Bronze Badge - 5+ Contests</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg">
                  <div className="text-sm font-semibold text-green-800 dark:text-green-200">Daily Streak</div>
                  <div className="text-xs text-green-700 dark:text-green-300">Gold Badge - 50 Days</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Developer
