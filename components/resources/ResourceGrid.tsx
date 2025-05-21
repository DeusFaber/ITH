
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileText, Play, FileDown, FileCode, ArrowRight } from "lucide-react";
import { Resource } from "../../lib/types";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Play className="h-4 w-4" />;
      case "template":
        return <FileCode className="h-4 w-4" />;
      case "document":
        return <FileDown className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Resource Center</CardTitle>
        <CardDescription>Knowledge base and training resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="h-full overflow-hidden">
              {resource.thumbnail && (
                <div className="w-full h-40 relative">
                  <ImageWithFallback
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader className={resource.thumbnail ? "pt-3" : ""}>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <Badge className="ml-2 capitalize">{resource.category}</Badge>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex w-full justify-between items-center">
                  <Badge variant="outline" className="capitalize flex items-center gap-1">
                    {getTypeIcon(resource.type)}
                    {resource.type}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View Resource
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
