export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[]
  publishedAt: string
  readTime: number
  author: {
    name: string
    image?: any
  }
  mainImage?: any
  categories?: string[]
}

export interface Project {
  _id: string
  title: string
  slug?: {
    current: string
  }
  description: string
  longDescription?: any[]
  tech?: string[]
  githubUrl?: string
  liveUrl?: string
  image?: any
  gallery?: any[]
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'archived'
  completedAt?: string
  createdAt: string
}