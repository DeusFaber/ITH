
import { TicketList } from "../components/tickets/TicketList";
import { mockTickets } from "../lib/mockData";

export function Tickets() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Inbox</h1>
        <p className="text-muted-foreground">
          Manage your IT communications, support requests, and updates
        </p>
      </div>
      
      <TicketList tickets={mockTickets} />
    </div>
  );
}
