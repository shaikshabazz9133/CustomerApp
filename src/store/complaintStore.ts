import { create } from "zustand";
import { Complaint, IssueType, ComplaintStatus } from "../data/types";
import {
  mockComplaints,
  getComplaintsByCustomerId,
} from "../data/mockComplaints";

interface NewComplaintDraft {
  wardNumber: number;
  issueType: IssueType | null;
  description: string;
  imageUri: string | null;
  location: string;
}

interface ComplaintState {
  complaints: Complaint[];
  selectedComplaint: Complaint | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  draft: NewComplaintDraft;

  // Actions
  loadComplaints: (customerId: string) => void;
  selectComplaint: (complaint: Complaint | null) => void;
  submitComplaint: (customerId: string) => Promise<Complaint | null>;
  updateDraft: (updates: Partial<NewComplaintDraft>) => void;
  resetDraft: () => void;
  clearError: () => void;
}

const defaultDraft: NewComplaintDraft = {
  wardNumber: 1,
  issueType: null,
  description: "",
  imageUri: null,
  location: "",
};

let complaintCounter = mockComplaints.length + 1;

export const useComplaintStore = create<ComplaintState>((set, get) => ({
  complaints: [],
  selectedComplaint: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  draft: { ...defaultDraft },

  loadComplaints: (customerId) => {
    set({ isLoading: true });
    // Simulate API delay
    setTimeout(() => {
      const data = getComplaintsByCustomerId(customerId);
      set({ complaints: data, isLoading: false });
    }, 800);
  },

  selectComplaint: (complaint) => set({ selectedComplaint: complaint }),

  submitComplaint: async (customerId) => {
    const { draft } = get();
    if (!draft.issueType || !draft.description.trim()) {
      set({ error: "Please fill in all required fields." });
      return null;
    }

    set({ isSubmitting: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newComplaint: Complaint = {
      id: `CMP${String(complaintCounter).padStart(3, "0")}`,
      complaintNumber: `NMC-2024-${String(complaintCounter).padStart(3, "0")}`,
      customerId,
      wardNumber: draft.wardNumber,
      issueType: draft.issueType!,
      description: draft.description,
      status: "submitted",
      priority: "medium",
      imageUri: draft.imageUri ?? undefined,
      location: draft.location || undefined,
      timeline: [
        {
          id: `TL_${Date.now()}`,
          status: "submitted",
          timestamp: new Date().toISOString(),
          note: "Complaint submitted by citizen.",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    complaintCounter++;

    set((state) => ({
      complaints: [newComplaint, ...state.complaints],
      isSubmitting: false,
    }));

    return newComplaint;
  },

  updateDraft: (updates) =>
    set((state) => ({ draft: { ...state.draft, ...updates } })),

  resetDraft: () => set({ draft: { ...defaultDraft } }),

  clearError: () => set({ error: null }),
}));
