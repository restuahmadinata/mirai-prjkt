import Layout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { projectBySlugQuery } from "@/lib/queries";
import { Project } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  return await client.fetch(projectBySlugQuery, { slug });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getStatusColor(status: string) {
  const styles = {
    'completed': 'text-green-600 bg-green-100',
    'in-progress': 'text-yellow-600 bg-yellow-100',
    'archived': 'text-gray-600 bg-gray-100'
  };
  
  return styles[status as keyof typeof styles] || styles.completed;
}

// Portable Text components
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(400).url()}
          alt={value.alt || 'Project image'}
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />
        {value.caption && (
          <p className="text-sm text-gray-600 text-center mt-2">{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
  },
};

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/project">
            <Button variant="ghost" className="mb-4 px-2">
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Button>
          </Link>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold leading-tight">
                {project.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {project.completedAt && (
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Completed {formatDate(project.completedAt)}</span>
                </div>
              )}
            </div>

            {project.image && (
              <div className="mt-6">
                <Image
                  src={urlFor(project.image).width(1200).height(600).url()}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    View Code
                  </a>
                </Button>
              )}
              
              {project.liveUrl && (
                <Button
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          {project.longDescription && project.longDescription.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
              <div className="prose prose-lg max-w-none">
                <PortableText 
                  value={project.longDescription} 
                  components={portableTextComponents}
                />
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <Image
                    key={index}
                    src={urlFor(image).width(600).height(400).url()}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Share this project:</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  Copy Link
                </Button>
              </div>
            </div>
            
            <Link href="/project">
              <Button>
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export async function generateStaticParams() {
  const projects: Project[] = await client.fetch(`
    *[_type == "project" && defined(slug.current)][].slug.current
  `);

  return projects.map((slug) => ({
    slug,
  }));
}