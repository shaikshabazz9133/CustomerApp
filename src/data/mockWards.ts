import { Ward } from "./types";

export const mockWards: Ward[] = [
  {
    number: 1,
    name: "Ward 1",
    area: "Ramalingeswara Nagar",
    councillorName: "K. Suresh Babu",
    totalComplaints: 23,
    pendingComplaints: 5,
    completedComplaints: 18,
  },
  {
    number: 2,
    name: "Ward 2",
    area: "Santhapet",
    councillorName: "P. Lakshmi Devi",
    totalComplaints: 31,
    pendingComplaints: 8,
    completedComplaints: 23,
  },
  {
    number: 3,
    name: "Ward 3",
    area: "Magunta Layout",
    councillorName: "V. Ramana Reddy",
    totalComplaints: 19,
    pendingComplaints: 3,
    completedComplaints: 16,
  },
  {
    number: 7,
    name: "Ward 7",
    area: "Gandhi Nagar",
    councillorName: "N. Venkata Rao",
    totalComplaints: 44,
    pendingComplaints: 12,
    completedComplaints: 32,
  },
  {
    number: 12,
    name: "Ward 12",
    area: "Pinakini Nagar",
    councillorName: "S. Anitha Reddy",
    totalComplaints: 38,
    pendingComplaints: 9,
    completedComplaints: 29,
  },
  {
    number: 15,
    name: "Ward 15",
    area: "Vijayarai",
    councillorName: "M. Krishnamurthy",
    totalComplaints: 27,
    pendingComplaints: 6,
    completedComplaints: 21,
  },
  {
    number: 23,
    name: "Ward 23",
    area: "Potlacheruvu",
    councillorName: "B. Sarada",
    totalComplaints: 35,
    pendingComplaints: 11,
    completedComplaints: 24,
  },
];

export const getWardByNumber = (number: number): Ward | undefined =>
  mockWards.find((w) => w.number === number);
