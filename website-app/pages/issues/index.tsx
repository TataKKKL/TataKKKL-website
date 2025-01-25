import { useState } from 'react'
import { Card } from "@/components/ui/card"
import GitHubProjectsScrollArea from '@/components/GitHubProjectsScrollArea'
import GitHubIssues from '@/components/GitHubIssues'

const IssuesPage = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState<string | null>(null)

  const getFullRepoName = (): string => {
    if (!repoUrl) return selectedRepo || ''
    return new URL(repoUrl).pathname.slice(1)
  }

  const handleSelectRepo = (name: string, url: string) => {
    setSelectedRepo(name)
    setRepoUrl(url)
  }

  const fullRepoName = getFullRepoName()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="p-6 w-full md:w-80 h-[400px] bg-white dark:bg-slate-900">
            <h2 className="text-slate-900 dark:text-slate-100 font-semibold mb-4">
              Select Repository
            </h2>
            <div className="h-[300px]">
              <GitHubProjectsScrollArea
                selectedRepo={selectedRepo}
                onSelectRepo={handleSelectRepo}
              />
            </div>
          </Card>

          {selectedRepo ? (
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
                Issues of {fullRepoName}
              </h1>
              <GitHubIssues selectedRepo={fullRepoName} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Please select a repository to view its issues
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IssuesPage