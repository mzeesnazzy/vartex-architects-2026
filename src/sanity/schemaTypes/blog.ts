export default {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Post Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: (new Date()).toISOString(),
        },
        {
            name: 'isComingSoon',
            title: 'Coming Soon',
            description: 'If toggled, the blog post will show a "Coming Soon" tag and will not be clickable.',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'featured',
            title: 'Featured Post',
            description: 'The latest featured post will appear promently in the Journal index.',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            initialValue: 'Journal',
        },
        {
            name: 'readTime',
            title: 'Read Time (Minutes)',
            type: 'number',
            initialValue: 5,
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } },
                { type: 'youtube' },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
}
