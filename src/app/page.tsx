import Layout from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center overflow-hidden ring-4 ring-primary/20">
            <img
              src="https://safebooru.org//samples/3858/sample_51691c29cb2bdd912b63e45b6fa40efb9f55dd54.jpg?4033085"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">hi there, i'm Radinata</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              a weebs, nothing special.
            </p>
          </div>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">about me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 sm:space-y-4 text-muted-foreground">
              <p className="text-sm sm:text-base">
                i love pisang goreng.
              </p>
              <p className="text-sm sm:text-base">
                and i love Mirai Kuriyama too.
              </p>
              <Separator className="my-4" />
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <MapPin size={16} className="text-primary" />
                <span>Indonesia</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card >
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">skills & technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                "eat", "sleep", "take a shit", "breathing"
              ].map((skill) => (
                <Badge 
                  key={skill}
                  variant="secondary"
                  className="bg-primary/10 text-primary px-3 py-2 text-center text-xs sm:text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors justify-center"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Projects */}
        <Card >
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">what i'm working on</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-4 border-primary pl-4 space-y-1">
                <h3 className="font-semibold text-sm sm:text-base">personal website</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  for fun
                </p>
              </div>
              <div className="border-l-4 border-green-500 dark:border-green-400 pl-4 space-y-1">
                <h3 className="font-semibold text-sm sm:text-base">learning react</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  for fun (2)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card >
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl">let's connect</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              i'm always open to interesting conversations and collaboration opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2 text-xs sm:text-sm h-9 sm:h-10">
                <Github size={14} className="sm:size-4" />
                <span className="hidden sm:inline">GitHub</span>
                <span className="sm:hidden">GitHub</span>
                <ExternalLink size={12} className="sm:size-3" />
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 text-xs sm:text-sm h-9 sm:h-10">
                <Linkedin size={14} className="sm:size-4" />
                <span className="hidden sm:inline">LinkedIn</span>
                <span className="sm:hidden">LinkedIn</span>
                <ExternalLink size={12} className="sm:size-3" />
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 text-xs sm:text-sm h-9 sm:h-10">
                <Mail size={14} className="sm:size-4" />
                <span className="hidden sm:inline">Email</span>
                <span className="sm:hidden">Email</span>
                <ExternalLink size={12} className="sm:size-3" />
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 text-xs sm:text-sm h-9 sm:h-10">
                <Phone size={14} className="sm:size-4" />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
                <ExternalLink size={12} className="sm:size-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fun Fact */}
        <div className="text-center py-6 sm:py-8">
          <p className="text-xs sm:text-sm text-muted-foreground">
            fun fact: arelio hitam
          </p>
        </div>
      </div>
    </Layout>
  );
}