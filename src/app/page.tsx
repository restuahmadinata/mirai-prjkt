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
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center overflow-hidden">
            <img
              src="https://safebooru.org//samples/3858/sample_51691c29cb2bdd912b63e45b6fa40efb9f55dd54.jpg?4033085" // ← Ganti dengan path atau URL gambarmu
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold">hi there, i'm Radinata</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            a weebs, nothing special.
          </p>
        </div>

        {/* About Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">about me</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              i love pisang goreng.
            </p>
            <p>
              and i love Mirai Kuriyama too.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} />
              <span>Indonesia</span>
            </div>
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">skills & technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "eat", "sleep", "take a shit", "breathing"
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
          <h2 className="text-2xl font-semibold mb-4">what i'm working on</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">personal website</h3>
              <p className="text-gray-600 text-sm">
                for fun
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">learning react</h3>
              <p className="text-gray-600 text-sm">
                for fun (2)
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4">let's connect</h2>
          <p className="text-gray-600 mb-6">
            i'm always open to interesting conversations and collaboration opportunities.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Github size={16} />
              gitHub
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Linkedin size={16} />
              linkedIn
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail size={16} />
              email
            </Button>
          </div>
        </Card>

        {/* Fun Fact */}
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            fun fact: arelio hitam
          </p>
        </div>
      </div>
    </Layout>
  );
}
