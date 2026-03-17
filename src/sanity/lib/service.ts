import { client } from './client'
import { featuredProjectsQuery, selectedWorksQuery, allProjectsQuery, projectBySlugQuery, allBlogsQuery, blogBySlugQuery, siteSettingsQuery } from './queries'
import { projects as mockProjects } from '@/data/projects'
// Note: journal mock data isn't in a central file yet, will handle fallback for it too

export async function getFeaturedProjects() {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return mockProjects.slice(0, 5)
    }

    try {
        const data = await client.fetch(featuredProjectsQuery)
        return data.length > 0 ? data : mockProjects.slice(0, 5)
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return mockProjects.slice(0, 5)
    }
}

export async function getSelectedWorks() {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return mockProjects.slice(0, 2)
    }

    try {
        const data = await client.fetch(selectedWorksQuery)
        return data.length > 0 ? data : mockProjects.slice(0, 2)
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return mockProjects.slice(0, 2)
    }
}

export async function getAllProjects() {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return mockProjects
    }

    try {
        const data = await client.fetch(allProjectsQuery)
        return data.length > 0 ? data : mockProjects
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return mockProjects
    }
}

export async function getProjectBySlug(slug: string) {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return null // Caller should handle fallback to mock project by ID
    }

    try {
        return await client.fetch(projectBySlugQuery, { slug })
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return null
    }
}

export async function getBlogs() {
    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return [] // Fallback to empty if not configured
        }
        return await client.fetch(allBlogsQuery)
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return []
    }
}

export async function getBlogBySlug(slug: string) {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return null
    }

    try {
        return await client.fetch(blogBySlugQuery, { slug })
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return null
    }
}

export async function getSiteSettings() {
    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'missing' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return null
        }
        return await client.fetch(siteSettingsQuery)
    } catch (error) {
        console.error('Sanity fetch error:', error)
        return null
    }
}
