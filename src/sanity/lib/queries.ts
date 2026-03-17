import { groq } from 'next-sanity'

// Fetch all featured projects for the Home Hero
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && (!defined(isComingSoon) || isComingSoon == false)] | order(coalesce(order, 0) asc, year desc, _createdAt desc) {
    id,
    "slug": slug.current,
    title,
    location,
    year,
    "categories": categories[]->title,
    category,
    isComingSoon,
    "image": mainImage.asset->url,
    "images": [mainImage.asset->url],
    description
  }
`

// Fetch projects marked as Selected Works for homepage
export const selectedWorksQuery = groq`
  *[_type == "project" && selectedWork == true && (!defined(isComingSoon) || isComingSoon == false)] | order(coalesce(order, 0) asc, year desc, _createdAt desc) [0...2] {
    id,
    "slug": slug.current,
    title,
    location,
    year,
    "categories": categories[]->title,
    category,
    isComingSoon,
    "image": mainImage.asset->url,
    "images": [mainImage.asset->url],
    description
  }
`

// Fetch all projects for the Archive
export const allProjectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 0) asc, year desc, _createdAt desc) {
    id,
    "slug": slug.current,
    title,
    client,
    location,
    year,
    area,
    duration,
    description,
    isComingSoon,
    "categories": categories[]->title,
    category,
    "image": mainImage.asset->url,
    "images": [mainImage.asset->url],
  }
`

// Fetch single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    id,
    "slug": slug.current,
    title,
    client,
    location,
    year,
    area,
    isComingSoon,
    "categories": categories[]->title,
    category,
    description,
    "images": [mainImage.asset->url] + gallery[].asset->url,
    "mainImage": mainImage.asset->url,
    duration,
    materiality,
    sustainability
  }
`

// Fetch blog posts
export const allBlogsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    featured,
    isComingSoon,
    "image": mainImage.asset->url,
    category,
    readTime,
    body
  }
`
// Fetch single blog post by slug
export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    featured,
    isComingSoon,
    "image": mainImage.asset->url,
    readTime,
    body,
    author
  }
`

// Fetch site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    keywords,
    journalComingSoon
  }
`
