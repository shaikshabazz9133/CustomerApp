import { Complaint } from "./types";

export const mockComplaints: Complaint[] = [
  {
    id: "CMP001",
    complaintNumber: "NMC-2024-001",
    customerId: "CUS001",
    wardNumber: 12,
    issueType: "road_damage",
    description:
      "There is a large pothole near the main road junction in front of Govt. High School. It has been causing accidents and is very dangerous for two-wheelers.",
    status: "completed",
    priority: "high",
    imageUri: "https://picsum.photos/seed/road1/400/300",
    location: "Main Road, Near Govt. High School, Ward 12",
    assignedTo: "EMP001",
    assignedEmployeeName: "Mahesh Babu",
    timeline: [
      {
        id: "TL001",
        status: "submitted",
        timestamp: "2024-11-01T09:00:00Z",
        note: "Complaint submitted by citizen.",
      },
      {
        id: "TL002",
        status: "assigned",
        timestamp: "2024-11-01T11:30:00Z",
        note: "Assigned to field worker Mahesh Babu.",
        updatedBy: "Admin",
      },
      {
        id: "TL003",
        status: "in_progress",
        timestamp: "2024-11-02T09:00:00Z",
        note: "Work started. Materials procured.",
        updatedBy: "Mahesh Babu",
      },
      {
        id: "TL004",
        status: "completed",
        timestamp: "2024-11-03T17:00:00Z",
        note: "Pothole repaired successfully.",
        updatedBy: "Mahesh Babu",
      },
    ],
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2024-11-03T17:00:00Z",
    resolvedAt: "2024-11-03T17:00:00Z",
  },
  {
    id: "CMP002",
    complaintNumber: "NMC-2024-002",
    customerId: "CUS001",
    wardNumber: 12,
    issueType: "garbage",
    description:
      "Garbage has been piling up near the community park for over a week. No collection has happened. The smell is unbearable and causing health issues.",
    status: "in_progress",
    priority: "medium",
    imageUri: "https://picsum.photos/seed/garbage1/400/300",
    location: "Community Park Entrance, Ward 12",
    assignedTo: "EMP002",
    assignedEmployeeName: "Venkata Rao",
    timeline: [
      {
        id: "TL005",
        status: "submitted",
        timestamp: "2024-11-20T08:00:00Z",
        note: "Complaint submitted by citizen.",
      },
      {
        id: "TL006",
        status: "assigned",
        timestamp: "2024-11-20T10:00:00Z",
        note: "Assigned to Venkata Rao.",
        updatedBy: "Admin",
      },
      {
        id: "TL007",
        status: "in_progress",
        timestamp: "2024-11-21T08:30:00Z",
        note: "Cleanup team dispatched to the location.",
        updatedBy: "Venkata Rao",
      },
    ],
    createdAt: "2024-11-20T08:00:00Z",
    updatedAt: "2024-11-21T08:30:00Z",
  },
  {
    id: "CMP003",
    complaintNumber: "NMC-2024-003",
    customerId: "CUS001",
    wardNumber: 12,
    issueType: "street_light",
    description:
      "Three street lights on the main road have been non-functional for 2 weeks. Creating safety issues, especially for women at night.",
    status: "assigned",
    priority: "high",
    location: "Main Road, Sector 5, Ward 12",
    assignedTo: "EMP003",
    assignedEmployeeName: "Srinivas Murthy",
    timeline: [
      {
        id: "TL008",
        status: "submitted",
        timestamp: "2024-12-01T07:00:00Z",
        note: "Complaint submitted by citizen.",
      },
      {
        id: "TL009",
        status: "assigned",
        timestamp: "2024-12-01T14:00:00Z",
        note: "Assigned to electrician Srinivas Murthy.",
        updatedBy: "Admin",
      },
    ],
    createdAt: "2024-12-01T07:00:00Z",
    updatedAt: "2024-12-01T14:00:00Z",
  },
  {
    id: "CMP004",
    complaintNumber: "NMC-2024-004",
    customerId: "CUS001",
    wardNumber: 12,
    issueType: "drainage",
    description:
      "Drainage pipe is blocked and overflowing onto the road. Creates waterlogging during rain and is a health hazard.",
    status: "submitted",
    priority: "medium",
    location: "Cross Road No. 3, Ward 12",
    timeline: [
      {
        id: "TL010",
        status: "submitted",
        timestamp: "2024-12-10T06:00:00Z",
        note: "Complaint submitted by citizen.",
      },
    ],
    createdAt: "2024-12-10T06:00:00Z",
    updatedAt: "2024-12-10T06:00:00Z",
  },
];

export const getComplaintsByCustomerId = (customerId: string): Complaint[] =>
  mockComplaints.filter((c) => c.customerId === customerId);

export const getComplaintById = (id: string): Complaint | undefined =>
  mockComplaints.find((c) => c.id === id);
