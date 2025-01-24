// hooks/useGithubProjects.ts
import { useState, useEffect } from 'react'

interface GitHubProject {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
}

export function useGithubProjects() {
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/github-projects')
        if (!response.ok) throw new Error('Failed to fetch projects')
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const refreshProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/github-projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  return { projects, loading, error, refreshProjects }
}