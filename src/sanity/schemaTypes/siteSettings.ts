import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'journalComingSoon',
            title: 'Global Journal Coming Soon',
            type: 'boolean',
            initialValue: false,
            description: 'If enabled, the entire Journal/Blog page will show a "Coming Soon" state.'
        }),
    ],
})
