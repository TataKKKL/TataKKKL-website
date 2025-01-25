import { useState } from 'react'
import GitHubIssues from '@/components/GitHubIssues'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

const repos = [
  "PathOnAI/LiteMultiAgent",
  "PathOnAI/LiteWebAgentTreeSearch",
  "PathOnAI/LiteWebAgent"
]

const Issues = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="p-6 w-full md:w-80 h-[400px] bg-white dark:bg-slate-900">
            <h2 className="text-slate-900 dark:text-slate-100 font-semibold mb-4">Select Repository</h2>
            <div className="h-[300px]">
              <ScrollArea className="h-full w-full rounded-md border border-slate-200 dark:border-slate-800">
                <div className="p-4">
                  {repos.map(repo => (
                    <div
                      key={repo}
                      className={`p-3 cursor-pointer rounded-md transition-colors mb-2 last:mb-0
                        ${selectedRepo === repo 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      onClick={() => setSelectedRepo(repo)}
                    >
                      {repo}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
          
          {selectedRepo ? (
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
                Issues of {selectedRepo}
              </h1>
              <GitHubIssues selectedRepo={selectedRepo} />
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

export default Issues