import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { GitHubProject } from '@/interfaces/githubprojectInterface'
import { useState, useEffect } from 'react'

interface GitHubProjectsScrollAreaProps {
  selectedRepo: string | null
  onSelectRepo: (name: string, url: string) => void
  className?: string
}

const GitHubProjectsScrollArea = ({
  selectedRepo,
  onSelectRepo,
  className = ''
}: GitHubProjectsScrollAreaProps) => {
  const [repos, setRepos] = useState<GitHubProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github-projects')
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError('Failed to load repositories')
        console.error('Error fetching repos:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return (
    <ScrollArea className={`h-full w-full rounded-md border border-slate-200 dark:border-slate-800 ${className}`}>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-6 w-6 animate-spin text-slate-600 dark:text-slate-400" />
        </div>
      ) : error ? (
        <div className="p-4 text-red-500 dark:text-red-400">
          {error}
        </div>
      ) : (
        <div className="p-4">
          {repos.map(repo => (
            <div
              key={repo.id}
              className={`p-3 cursor-pointer rounded-md transition-colors mb-2 last:mb-0
                ${selectedRepo === repo.name
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              onClick={() => onSelectRepo(repo.name, repo.html_url)}
            >
              <div className="font-medium">{repo.name}</div>
              {repo.description && (
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {repo.description}
                </div>
              )}
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                {repo.language && `${repo.language} • `}
                ⭐ {repo.stargazers_count}
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  )
}

export default GitHubProjectsScrollArea