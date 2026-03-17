import JournalClient from './JournalClient';
import { getBlogs, getSiteSettings } from '@/sanity/lib/service';
import { journalPosts as mockPosts } from '@/data/journal';

export const revalidate = 60;

export default async function JournalPage() {
    const sanityPosts = await getBlogs();
    const settings = await getSiteSettings();
    const posts = sanityPosts.length > 0 ? sanityPosts : mockPosts;

    return <JournalClient initialPosts={posts} isGlobalComingSoon={settings?.journalComingSoon} />;
}
