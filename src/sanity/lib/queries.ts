import { groq } from 'next-sanity'

// Fetch all featured projects for the Home Hero
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(year desc) {
    id,
    "slug": slug.current,
    title,
    location,
    year,
    "categories": categories[]->title,
    category,
    "image": mainImage.asset->url,
    "images": [mainImage.asset->url],
    description
  }
`

// Fetch projects marked as Selected Works for homepage
export const selectedWorksQuery = groq`
  *[_type == "project" && (selectedWork == true || "Selected Works" in categories[]->title)] | order(year desc) [0...2] {
    id,
    "slug": slug.current,
    title,
    location,
    year,
    "categories": categories[]->title,
    category,
    "image": mainImage.asset->url,
    "images": [mainImage.asset->url],
    description
  }
`

// Fetch all projects for the Archive
export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    id,
    "slug": slug.current,
    title,
    client,
    location,
    year,
    area,
    duration,
    description,
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
    "image": mainImage.asset->url,
    category,
    readTime,
    body,
    author
  }
`
