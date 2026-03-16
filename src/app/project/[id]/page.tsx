import ProjectClient from './ProjectClient';
import { getProjectBySlug, getAllProjects } from '@/sanity/lib/service';
import { PROJECT_DETAILS, projectList as mockProjects } from '@/data/projects_detail';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<any> {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Try fetching from Sanity first
    let project: any = await getProjectBySlug(id);

    // Fallback to mock data
    if (!project) {
        project = PROJECT_DETAILS[id as keyof typeof PROJECT_DETAILS];
    }

    if (!project) return { title: "Project Not Found" };

    return {
        title: project.title,
        description: project.description?.slice(0, 160) || `Experience ${project.title} by VARTEX Architects. Architecture shaped by idea, context, and precision.`,
        openGraph: {
            title: project.title,
            description: project.description?.slice(0, 160),
            images: project.images?.[0] ? [{ url: project.images[0] }] : [],
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Try fetching from Sanity first
    let project: any = await getProjectBySlug(id);

    // Fallback to mock data if not found in Sanity
    if (!project) {
        project = PROJECT_DETAILS[id as keyof typeof PROJECT_DETAILS];
    }

    // Default fallback to "Nka na Uzu" if still not found
    if (!project) {
        project = PROJECT_DETAILS["nka-na-uzu"];
    }

    if (!project) {
        notFound();
    }

    // Get all projects for navigation and related works
    const allProjects: any[] = await getAllProjects();
    const activeProjects = allProjects.length > 0 ? allProjects : mockProjects;

    // Navigation logic
    const currentIndex = activeProjects.findIndex(p => (p.slug || p.id) === id);
    const prevProject = currentIndex > 0 ? activeProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < activeProjects.length - 1 ? activeProjects[currentIndex + 1] : activeProjects[0];

    // Related works (excluding current)
    const relatedWorks = activeProjects
        .filter(p => (p.slug || p.id) !== id)
        .slice(0, 3);

    return (
        <ProjectClient
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            relatedWorks={relatedWorks}
        />
    );
}
