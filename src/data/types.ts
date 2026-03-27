// ─── Auth ────────────────────────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  wardNumber: number;
  address?: string;
  avatarUrl?: string;
  createdAt: string;
}

// ─── Complaint ───────────────────────────────────────────────────────────────
export type ComplaintStatus =
  | "submitted"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";
export type IssueType = "road_damage" | "garbage" | "drainage" | "street_light";
export type Priority = "low" | "medium" | "high";

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  timestamp: string;
  note: string;
  updatedBy?: string;
}

export interface Complaint {
  id: string;
  complaintNumber: string;
  customerId: string;
  wardNumber: number;
  issueType: IssueType;
  description: string;
  status: ComplaintStatus;
  priority: Priority;
  imageUri?: string;
  location?: string;
  assignedTo?: string;
  assignedEmployeeName?: string;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

// ─── Notification ────────────────────────────────────────────────────────────
export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "complaint_update" | "assignment" | "announcement" | "reminder";
  read: boolean;
  complaintId?: string;
  createdAt: string;
}

// ─── Ward ────────────────────────────────────────────────────────────────────
export interface Ward {
  number: number;
  name: string;
  area: string;
  councillorName: string;
  totalComplaints: number;
  pendingComplaints: number;
  completedComplaints: number;
}
