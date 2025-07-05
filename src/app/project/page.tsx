import Layout from "@/components/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries";
import { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

async function getProjects(): Promise<Project[]> {
  return await client.fetch(projectsQuery);
}

function getStatusBadge(status: string) {
  const styles = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'archived': 'bg-gray-100 text-gray-800'
  };
  
  return styles[status as keyof typeof styles] || styles.completed;
}

function formatStatus(status: string | null | undefined): string {
  if (!status) return 'completed';
  return status.replace('-', ' ');
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long'
  });
}

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">projects</h1>
          <p className="text-gray-600">collection of my work and side projects</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                {project.image ? (
                  <Image
                    src={urlFor(project.image).width(400).height(250).url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    project preview
                  </div>
                )}
                
                {/* Status & Featured badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className={`px-2 py-1 text-xs rounded-md ${getStatusBadge(project.status || 'completed')}`}>
                    {formatStatus(project.status)}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  {project.slug?.current ? (
                    <Link href={`/project/${project.slug.current}`}>
                      <h2 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">
                        {project.title}
                      </h2>
                    </Link>
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-700">
                      {project.title}
                    </h2>
                  )}
                  {project.completedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      Completed {formatDate(project.completedAt)}
                    </p>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  )) || null}
                </div>
                
                <div className="flex gap-2 pt-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        code
                      </a>
                    </Button>
                  )}
                  
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        live demo
                      </a>
                    </Button>
                  )}
                  
                  {project.slug?.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/project/${project.slug.current}`}>
                        Details →
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects found. Create your first project in Sanity Studio!</p>
          </div>
        )}
        
        <div className="text-center py-8">
          <p className="text-gray-500">more projects coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}