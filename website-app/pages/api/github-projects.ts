import type { NextApiRequest, NextApiResponse } from 'next'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  fork: boolean
  owner: {
    login: string
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error('GitHub API request failed')
    }

    const data: GitHubRepo[] = await response.json()

    // Filter repositories by organization and exclude forks
    const projects = data
      .filter((repo) => !repo.fork && 
        (repo.owner?.login === 'TataKKKL' || repo.owner?.login === 'PathOnAI'))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
      }))

    res.status(200).json(projects)
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    res.status(500).json({ message: 'Error fetching projects' })
  }
}
