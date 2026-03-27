export const Colors = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#EFF6FF",
  secondary: "#10B981",
  secondaryDark: "#059669",
  secondaryLight: "#ECFDF5",
  error: "#EF4444",
  errorLight: "#FEF2F2",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  info: "#3B82F6",
  infoLight: "#EFF6FF",
  success: "#10B981",
  successLight: "#ECFDF5",

  background: "#F8FAFC",
  backgroundDark: "#0F172A",
  surface: "#FFFFFF",
  surfaceDark: "#1E293B",
  surfaceElevated: "#FFFFFF",

  text: "#1E293B",
  textSecondary: "#64748B",
  textTertiary: "#94A3B8",
  textInverse: "#FFFFFF",
  textDark: "#F1F5F9",

  border: "#E2E8F0",
  borderDark: "#334155",
  divider: "#F1F5F9",

  cardBg: "#FFFFFF",
  cardShadow: "rgba(15, 23, 42, 0.08)",

  overlay: "rgba(0, 0, 0, 0.5)",
  glassBg: "rgba(255, 255, 255, 0.85)",
  glassBorder: "rgba(255, 255, 255, 0.3)",

  status: {
    submitted: "#F59E0B",
    assigned: "#3B82F6",
    in_progress: "#8B5CF6",
    completed: "#10B981",
    cancelled: "#EF4444",
  },
  statusBg: {
    submitted: "#FFFBEB",
    assigned: "#EFF6FF",
    in_progress: "#F5F3FF",
    completed: "#ECFDF5",
    cancelled: "#FEF2F2",
  },

  issueType: {
    road_damage: "#EF4444",
    garbage: "#F59E0B",
    drainage: "#3B82F6",
    street_light: "#8B5CF6",
  },

  gradient: {
    primary: ["#2563EB", "#1D4ED8"] as [string, string],
    secondary: ["#10B981", "#059669"] as [string, string],
    hero: ["#2563EB", "#7C3AED"] as [string, string],
    card: ["#FFFFFF", "#F8FAFC"] as [string, string],
    dark: ["#1E293B", "#0F172A"] as [string, string],
  },
};

export default Colors;
