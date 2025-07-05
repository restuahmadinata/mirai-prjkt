import Layout from "@/components/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center text-white text-3xl font-bold">
            M
          </div>
          <h1 className="text-4xl font-bold">Hello, I'm Mirai</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A passionate developer who loves creating beautiful and functional web applications
          </p>
        </div>

        {/* About Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Hi there! I'm a web developer with a passion for creating beautiful, 
              functional, and user-friendly websites. I enjoy working with modern 
              technologies and always strive to write clean, maintainable code.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              reading tech blogs, or working on side projects. I believe in 
              continuous learning and sharing knowledge with the community.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} />
              <span>Indonesia</span>
            </div>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "JavaScript", "TypeScript", "React", "Next.js",
              "Node.js", "Python", "HTML/CSS", "Tailwind CSS",
              "Git", "VS Code", "MongoDB", "PostgreSQL"
            ].map((skill) => (
              <div 
                key={skill}
                className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-center text-sm font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </Card>

        {/* Current Projects */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">What I'm Working On</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Personal Portfolio</h3>
              <p className="text-gray-600 text-sm">
                Building this website with Next.js and TypeScript
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">Learning React Native</h3>
              <p className="text-gray-600 text-sm">
                Exploring mobile app development with React Native
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Let's Connect</h2>
          <p className="text-gray-600 mb-6">
            I'm always open to interesting conversations and collaboration opportunities.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Github size={16} />
              GitHub
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Linkedin size={16} />
              LinkedIn
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail size={16} />
              Email
            </Button>
          </div>
        </Card>

        {/* Fun Fact */}
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            Fun fact: I started my coding journey by trying to make a simple website, 
            and here I am today! 🚀
          </p>
        </div>
      </div>
    </Layout>
  );
}
