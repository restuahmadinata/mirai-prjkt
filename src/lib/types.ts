// lib/types.ts
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