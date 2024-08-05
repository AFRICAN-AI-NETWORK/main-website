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
  slug: string
  createdAt: Date
  updatedAt: Date
}

export type AiTool = {
  id: string
  name: string
  description: string
  verified: boolean
  categories: Category[]
  pricingModel: string
  stars: number
  body: any
  siteUrl: string
  featured: boolean
  imageUrl?: string
  imageAlt?: string
  ytVideoUrl?: string
  alt: string
  authorName: string
  authorBio: any
  authorImageUrl: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export type Category = {
  id: string
  numTools: number
  title: string
  description: string
}

export type Country = {
  id: string
  name: string
  numMembers: number
  imageUrl: string
  socials: { platform: string; handle: string }[]
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
