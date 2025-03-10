import type { NextApiRequest, NextApiResponse } from 'next'
import { GitHubIssue } from '@/interfaces/githubIssueInterface'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { repo } = req.query

  if (!repo) {
    return res.status(400).json({ message: 'Repository parameter is required' })
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/issues?state=all`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('GitHub API request failed')
    }

    const issues: GitHubIssue[] = await response.json()

    const formattedIssues = issues.map(issue => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      state: issue.state,
      html_url: issue.html_url,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      body: issue.body,
      user: {
        login: issue.user.login,
        avatar_url: issue.user.avatar_url
      },
      labels: issue.labels.map(label => ({
        id: label.id,
        name: label.name,
        color: label.color
      }))
    }))

    res.status(200).json(formattedIssues)
  } catch (error) {
    console.error('Error fetching GitHub issues:', error)
    res.status(500).json({ message: 'Error fetching issues' })
  }
}