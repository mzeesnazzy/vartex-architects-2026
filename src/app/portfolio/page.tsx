import PortfolioClient from './PortfolioClient';
import { getAllProjects } from '@/sanity/lib/service';

export const revalidate = 60;

export default async function Portfolio() {
    const projects = await getAllProjects();

    return <PortfolioClient projects={projects} />;
}
