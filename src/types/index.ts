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

export type Project = {
  name: string
  description: any
  country: Country
  linkToProject: string
  publishedAt: Date
}

export type Event = {
  title: string
  description: string
  linkToEvent: string
  slug: string
  imageUrl: string
  location: string
  country: Country
  date: Date
  publishedAt: Date
}

export type Country = {
  id: string
  name: string
  numMembers: number
  imageUrl: string
  socials: { platform: string; handle: string }[]
  projects?: Project[]
  events?: Event[]
}

export type Feature = {
  id: string
  stats: string
  description: string
}

export type Partner = {
  id: string
  name: string
  logo: string
}

export type Course = {
  id: string
  title: string
  description: string
  duration: string
  instructor?: string
  categories: CourseCategory[]
  linkToCourse: string
  author: string
  imageUrl: string
  imageAlt: string
  createdAt: Date
  updatedAt: Date
}

export type CourseCategory = {
  id: string
  title: string
  description: string
  author: string
  createdAt: Date
  updatedAt: Date
}
