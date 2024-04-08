export type Resource = {
  id: string
  title: string
  category: string
  body: any
  imageUrl: string
  imageAlt: string
  authorName: string
  authorBio: any
  authorImageUrl: string
  createdAt: Date
  updatedAt: Date
  slug: string
}

export type Feature = {
  id: string
  stats: number
  description: string
}

export type Partner = {
  id: string
  name: string
  logo: string
}
