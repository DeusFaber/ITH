
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlusCircle } from "lucide-react";
import { Ticket } from "../../lib/types";
import { cn } from "../ui/utils";

interface TicketListProps {
  tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredTickets = activeTab === "all" 
    ? tickets 
    : tickets.filter(ticket => 
        activeTab === "open" 
          ? ["open", "in-progress"].includes(ticket.status) 
          : ticket.status === activeTab
      );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Support Tickets</CardTitle>
            <CardDescription className="text-xs">View and manage your IT support requests</CardDescription>
          </div>
          <Button size="sm" className="h-7 text-xs">
            <PlusCircle className="mr-1 h-3.5 w-3.5" />
            New Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs py-1">All</TabsTrigger>
            <TabsTrigger value="open" className="text-xs py-1">Open</TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs py-1">Resolved</TabsTrigger>
            <TabsTrigger value="closed" className="text-xs py-1">Closed</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-3">
            <div className="space-y-2">
              {filteredTickets.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-sm">No tickets found.</p>
                </div>
              ) : (
                filteredTickets.map(ticket => (
                  <div 
                    key={ticket.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between border rounded p-2 hover:bg-muted/20 transition-colors"
                  >
                    <div className="space-y-1 mb-2 md:mb-0 min-w-0">
                      <div className="flex flex-wrap items-center gap-1">
                        <h4 className="font-medium text-sm truncate">{ticket.title}</h4>
                        <Badge className={cn("capitalize text-xs", getStatusColor(ticket.status))}>
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={cn("capitalize text-xs", getPriorityColor(ticket.priority))}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{ticket.description}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>ID: {ticket.id.substring(0, 8)}</span>
                        <span className="hidden sm:inline">Category: {ticket.category}</span>
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-auto">
                      <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
                      {(ticket.status === "open" || ticket.status === "in-progress") && (
                        <Button size="sm" className="h-7 text-xs">Update</Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between py-2">
        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
        <Button variant="outline" size="sm" className="text-xs">Export History</Button>
      </CardFooter>
    </Card>
  );
}
