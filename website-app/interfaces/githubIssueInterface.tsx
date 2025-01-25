export interface GitHubIssue {
    id: number
    number: number
    title: string
    state: string
    html_url: string
    created_at: string
    updated_at: string
    body: string | null
    user: {
      login: string
      avatar_url: string
    }
    labels: {
      id: number
      name: string
      color: string
    }[]
  }