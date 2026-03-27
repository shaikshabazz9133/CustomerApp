import { create } from "zustand";
import { AppNotification } from "../data/types";
import { getNotificationsByUserId } from "../data/mockNotifications";

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  isLoading: boolean;

  // Actions
  loadNotifications: (userId: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  loadNotifications: (userId) => {
    set({ isLoading: true });
    setTimeout(() => {
      const data = getNotificationsByUserId(userId);
      const unreadCount = data.filter((n) => !n.read).length;
      set({ notifications: data, unreadCount, isLoading: false });
    }, 500);
  },

  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));
