import { create } from "zustand";
import { Customer } from "../data/types";
import { getCustomerByPhone } from "../data/mockUsers";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: Customer | null;
  phoneNumber: string;
  otpSent: boolean;
  error: string | null;

  // Actions
  setPhoneNumber: (phone: string) => void;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (updates: Partial<Customer>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  customer: null,
  phoneNumber: "",
  otpSent: false,
  error: null,

  setPhoneNumber: (phone) => set({ phoneNumber: phone }),

  sendOTP: async (phone) => {
    set({ isLoading: true, error: null });
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ isLoading: false, otpSent: true, phoneNumber: phone });
  },

  verifyOTP: async (otp) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock: accept any 4-digit OTP. For demo, use "1234"
    if (otp.length === 4) {
      const { phoneNumber } = get();
      // Find customer by phone, or create a mock one
      let customer = getCustomerByPhone(phoneNumber);
      if (!customer) {
        // Auto-create a new customer for demo
        customer = {
          id: `CUS_${Date.now()}`,
          name: "New User",
          phone: phoneNumber,
          wardNumber: 1,
          address: "Nellore",
          createdAt: new Date().toISOString(),
        };
      }
      set({
        isAuthenticated: true,
        isLoading: false,
        customer,
        otpSent: false,
      });
      return true;
    }

    set({ isLoading: false, error: "Invalid OTP. Please try again." });
    return false;
  },

  logout: () =>
    set({
      isAuthenticated: false,
      customer: null,
      phoneNumber: "",
      otpSent: false,
      error: null,
    }),

  clearError: () => set({ error: null }),

  updateProfile: (updates) =>
    set((state) => ({
      customer: state.customer ? { ...state.customer, ...updates } : null,
    })),
}));
