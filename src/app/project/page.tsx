import Layout from "@/components/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// Mock data untuk projects
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Website portfolio personal yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Menampilkan projects dan blog posts.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    githubUrl: "https://github.com/username/portfolio",
    liveUrl: "https://portfolio.example.com",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Todo App with React",
    description: "Aplikasi todo sederhana dengan fitur CRUD, local storage, dan dark mode. Dibangun untuk mempelajari state management di React.",
    tech: ["React", "JavaScript", "CSS3", "Local Storage"],
    githubUrl: "https://github.com/username/todo-app",
    liveUrl: "https://todo-app.example.com",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Dashboard cuaca yang menggunakan API eksternal untuk menampilkan informasi cuaca real-time dari berbagai kota.",
    tech: ["Vue.js", "Axios", "Weather API", "Chart.js"],
    githubUrl: "https://github.com/username/weather-dashboard",
    liveUrl: null,
    image: "/api/placeholder/400/250"
  }
];

export default function ProjectPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-gray-600">Collection of my work and side projects</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Project Preview
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                      Code
                    </a>
                  </Button>
                  
                  {project.liveUrl && (
                    <Button
                      size="sm"
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
            </Card>
          ))}
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-500">More projects coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
