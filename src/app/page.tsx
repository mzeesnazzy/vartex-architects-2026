import HomeClient from './HomeClient';
import { getFeaturedProjects, getSelectedWorks, getAllProjects } from '@/sanity/lib/service';

export const revalidate = 60;

export default async function Home() {
    const featuredProjects = await getFeaturedProjects();
    const selectedWorks = await getSelectedWorks();
    const allProjects = await getAllProjects();

    return <HomeClient featuredProjects={featuredProjects} selectedWorks={selectedWorks} allProjects={allProjects} />;
}
