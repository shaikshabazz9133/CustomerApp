import { AppNotification } from "./types";

export const mockNotifications: AppNotification[] = [
  {
    id: "NOT001",
    userId: "CUS001",
    title: "Complaint Resolved ✅",
    message:
      "Your complaint NMC-2024-001 (Road Damage) has been successfully resolved.",
    type: "complaint_update",
    read: false,
    complaintId: "CMP001",
    createdAt: "2024-11-03T17:05:00Z",
  },
  {
    id: "NOT002",
    userId: "CUS001",
    title: "Work In Progress 🔧",
    message:
      "Your garbage complaint NMC-2024-002 is now being worked on. Expected resolution: 1 day.",
    type: "complaint_update",
    read: false,
    complaintId: "CMP002",
    createdAt: "2024-11-21T08:35:00Z",
  },
  {
    id: "NOT003",
    userId: "CUS001",
    title: "Complaint Assigned 👷",
    message:
      "Your street light complaint NMC-2024-003 has been assigned to Srinivas Murthy.",
    type: "assignment",
    read: true,
    complaintId: "CMP003",
    createdAt: "2024-12-01T14:05:00Z",
  },
  {
    id: "NOT004",
    userId: "CUS001",
    title: "Ward Meeting 📢",
    message:
      "A ward meeting is scheduled on Dec 15, 2024 at Ward Office, Ward 12. Discuss local issues.",
    type: "announcement",
    read: true,
    createdAt: "2024-12-05T10:00:00Z",
  },
  {
    id: "NOT005",
    userId: "CUS001",
    title: "Feedback Reminder 🌟",
    message:
      "How was your experience with complaint NMC-2024-001? Rate our service to help us improve.",
    type: "reminder",
    read: false,
    complaintId: "CMP001",
    createdAt: "2024-11-05T10:00:00Z",
  },
];

export const getNotificationsByUserId = (userId: string): AppNotification[] =>
  mockNotifications.filter((n) => n.userId === userId);
