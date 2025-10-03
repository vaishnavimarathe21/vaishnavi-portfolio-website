import { useState, useEffect } from 'react'

interface CodeChefData {
  username: string
  rating: number
  stars: number
  problemsSolved: number
  contestsParticipated: number
  globalRank: number
  countryRank: number
  institution: string
}

export const useCodeChefData = (username: string) => {
  const [data, setData] = useState<CodeChefData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCodeChefData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Using the unofficial CodeChef API
        const response = await fetch(`https://codechef-api.vercel.app/${username}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch CodeChef data')
        }
        
        const result = await response.json()
        
        // Transform the API response to our interface
        const transformedData: CodeChefData = {
          username: result.username || username,
          rating: result.rating || 0,
          stars: result.stars || 0,
          problemsSolved: result.fullySolved || 0,
          contestsParticipated: result.contestParticipated || 0,
          globalRank: result.globalRank || 0,
          countryRank: result.countryRank || 0,
          institution: result.institution || 'R.C. Patel Institute of Technology'
        }
        
        setData(transformedData)
      } catch (err) {
        console.error('Error fetching CodeChef data:', err)
        setError('Failed to load CodeChef data')
        
        // Fallback to static data
        setData({
          username: username,
          rating: 0,
          stars: 0,
          problemsSolved: 0,
          contestsParticipated: 0,
          globalRank: 0,
          countryRank: 0,
          institution: 'R.C. Patel Institute of Technology'
        })
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchCodeChefData()
    }
  }, [username])

  return { data, loading, error }
}
