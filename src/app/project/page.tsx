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
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-black',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'archived': 'bg-muted text-muted-foreground'
  };
  
  return styles[status as keyof typeof styles] || styles.completed;
}

function formatStatus(status: string | null | undefined): string {
  if (!status) return 'completed';
  return status.replace('-', ' ');
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long'
  });
}

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">projects</h1>
          <p className="text-sm sm:text-base text-muted-foreground">collection of my work and side projects</p>
        </div>
        
        <div className="grid gap-4 sm:gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {project.image && (
                    <div className="flex-shrink-0 w-full sm:w-48 lg:w-56">
                      <div className="relative">
                        <Image
                          src={urlFor(project.image).width(250).height(180).url()}
                          alt={project.title}
                          width={250}
                          height={180}
                          className="rounded-lg object-cover w-full h-48 sm:h-36 lg:h-40"
                        />
                        {/* Status & Featured badges */}
                        <div className="absolute top-2 left-2 flex gap-2">
                          <span className={`px-2 py-1 text-xs rounded-md ${getStatusBadge(project.status || 'completed')}`}>
                            {formatStatus(project.status)}
                          </span>
                          {project.featured && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      {project.completedAt && (
                        <span>Completed {formatDate(project.completedAt)}</span>
                      )}
                      {!project.image && (
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 text-xs rounded-md ${getStatusBadge(project.status || 'completed')}`}>
                            {formatStatus(project.status)}
                          </span>
                          {project.featured && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md">
                              Featured
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {project.slug?.current ? (
                      <Link href={`/project/${project.slug.current}`}>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold hover:text-primary cursor-pointer line-clamp-2">
                          {project.title}
                        </h2>
                      </Link>
                    ) : (
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-muted-foreground line-clamp-2">
                        {project.title}
                      </h2>
                    )}
                    
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 text-xs"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github size={14} />
                            code
                          </a>
                        </Button>
                      )}
                      
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className="flex items-center gap-2 text-xs"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
                            demo
                          </a>
                        </Button>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {projects.length === 0 && (
          <Card className="dark:border-2 dark:border-white">
            <div className="text-center py-12">
              <p className="text-muted-foreground">no projects found.</p>
            </div>
          </Card>
        )}
        
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">more projects coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}