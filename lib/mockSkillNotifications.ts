
import { Notification } from "./types";

export const mockSkillNotifications: Notification[] = [
  {
    id: "skill-notif-1",
    title: "New Recommended Course",
    message: "Based on your role, we recommend the 'Advanced Network Security' course",
    date: "2025-05-17T09:30:00Z",
    read: false,
    type: "plan"
  },
  {
    id: "skill-notif-2",
    title: "Course Completion",
    message: "Congratulations! You have completed 'Cloud Infrastructure Basics' course",
    date: "2025-05-16T14:20:00Z",
    read: false,
    type: "plan"
  },
  {
    id: "skill-notif-3",
    title: "Certificate Earned",
    message: "You've earned a certificate for completing the IT Security Skills Path",
    date: "2025-05-15T11:45:00Z",
    read: true,
    type: "plan"
  },
  {
    id: "skill-notif-4",
    title: "Team Skill Challenge",
    message: "Your team has been invited to participate in the monthly skill challenge",
    date: "2025-05-10T08:15:00Z",
    read: true,
    type: "plan"
  },
  {
    id: "skill-notif-5",
    title: "New Skills Path Available",
    message: "A new 'DevOps for IT Professionals' skills path has been added",
    date: "2025-05-08T16:30:00Z",
    read: true,
    type: "plan"
  }
];
