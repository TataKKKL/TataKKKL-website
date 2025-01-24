// components/GitHubIssues.tsx
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

interface GitHubIssue {
  id: number
  number: number
  title: string
  state: string
  html_url: string
  created_at: string
  updated_at: string
  user: {
    login: string
    avatar_url: string
  }
  labels: string[]
}

export default function GitHubIssues() {
  const [issues, setIssues] = useState<GitHubIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIssues = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/github-issues')
      if (!response.ok) throw new Error('Failed to fetch issues')
      const data = await response.json()
      setIssues(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch issues')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <RefreshCw className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchIssues} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  const openIssues = issues.filter(issue => issue.state === 'open')
  const closedIssues = issues.filter(issue => issue.state === 'closed')

  const IssueCard = ({ issue }: { issue: GitHubIssue }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            #{issue.number} {issue.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={issue.user.avatar_url} 
            alt={issue.user.login}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {issue.user.login}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-sm rounded ${
            issue.state === 'open' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
          }`}>
            {issue.state}
          </span>
          <span className="text-sm text-gray-500">
            Created: {new Date(issue.created_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">GitHub Issues</h2>
        <Button onClick={fetchIssues} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
          Open Issues ({openIssues.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
        {openIssues.length === 0 && (
          <p className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            No open issues found.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
          Closed Issues ({closedIssues.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {closedIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
        {closedIssues.length === 0 && (
          <p className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            No closed issues found.
          </p>
        )}
      </section>
    </div>
  )
}