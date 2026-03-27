import { Customer } from "./types";

export const mockCustomers: Customer[] = [
  {
    id: "CUS001",
    name: "Ravi Kumar",
    phone: "9876543210",
    email: "ravi.kumar@email.com",
    wardNumber: 12,
    address: "Plot No. 45, Pinakini Nagar, Nellore - 524001",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "CUS002",
    name: "Priya Sharma",
    phone: "9876543211",
    email: "priya.sharma@email.com",
    wardNumber: 7,
    address: "Door No. 12-3-45, Gandhi Nagar, Nellore - 524002",
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "CUS003",
    name: "Suresh Reddy",
    phone: "9876543212",
    email: "suresh.reddy@email.com",
    wardNumber: 23,
    address: "H.No. 8-7-6, Santhapet, Nellore - 524003",
    createdAt: "2024-03-05T10:00:00Z",
  },
];

export const getCustomerByPhone = (phone: string): Customer | undefined =>
  mockCustomers.find((c) => c.phone === phone);

export const defaultCustomer = mockCustomers[0];
