export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    groups: [
        {
            name: 'basic',
            title: 'Basic Info',
        },
    ],
    fields: [
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "isComingSoon",
            title: "Coming Soon",
            type: "boolean",
            initialValue: false,
            description: "If enabled, this project will be marked as 'Coming Soon' and will not be clickable."
        },
        {
            name: 'order',
            title: 'Order',
            description: 'Manual sorting order (1 = first, 2 = second, etc.). New projects default to top.',
            type: 'number',
        },
        {
            name: 'featured',
            title: 'Featured on Homepage',
            description: 'If toggled, this project will appear in the home page hero carousel.',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'selectedWork',
            title: 'Show in Selected Works',
            description: 'If toggled, this project will appear in the "Selected Works" section on the homepage. Pick exactly 2 projects.',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'categories',
            title: 'Categories',
            description: 'Select one or more categories for this project.',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
        },
        {
            name: 'category',
            title: 'Category (legacy)',
            description: 'Legacy category field for existing data transition.',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'client',
            title: 'Client',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'year',
            title: 'Year',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'area',
            title: 'Area / Size',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'duration',
            title: 'Status',
            description: 'Current status of the project (e.g., In View, Completed, On-going).',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'materiality',
            title: 'Materiality',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'sustainability',
            title: 'Sustainability',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'mainImage',
            title: 'Main Hero Image',
            description: 'The high-resolution image used in the homepage carousel.',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'gallery',
            title: 'Project Gallery',
            description: 'Drag and drop images to reorder them in the project detail view.',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            options: {
                layout: 'grid',
            },
        },
        {
            name: 'description',
            title: 'Project Description',
            type: 'text',
            rows: 5,
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
}
