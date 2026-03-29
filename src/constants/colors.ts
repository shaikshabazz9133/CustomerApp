export const Colors = {
  // TDP Party Colors — AP Government
  primary: "#F5C518", // TDP Golden Yellow
  primaryDark: "#C58A00", // Dark Gold
  primaryLight: "#FFF8DC", // Corn Silk
  secondary: "#1A3654", // TDP Navy Blue
  secondaryDark: "#102540",
  secondaryLight: "#E8F0FE",
  error: "#EF4444",
  errorLight: "#FEF2F2",
  warning: "#D97706",
  warningLight: "#FEF3C7",
  info: "#1A56DB",
  infoLight: "#EFF6FF",
  success: "#10B981",
  successLight: "#ECFDF5",

  background: "#FFFDF5",
  backgroundDark: "#1A2535",
  surface: "#FFFFFF",
  surfaceDark: "#1A2535",
  surfaceElevated: "#FFFFFF",

  text: "#1A2535",
  textSecondary: "#64748B",
  textTertiary: "#94A3B8",
  textInverse: "#FFFFFF",
  textDark: "#FFF8DC",

  border: "#F0E6B0",
  borderDark: "#2A3545",
  divider: "#FFF3B0",

  cardBg: "#FFFFFF",
  cardShadow: "rgba(197, 138, 0, 0.12)",

  overlay: "rgba(0, 0, 0, 0.5)",
  glassBg: "rgba(255, 255, 255, 0.85)",
  glassBorder: "rgba(255, 248, 220, 0.4)",

  status: {
    submitted: "#D97706",
    assigned: "#1A56DB",
    in_progress: "#7C3AED",
    completed: "#10B981",
    cancelled: "#EF4444",
  },
  statusBg: {
    submitted: "#FEF3C7",
    assigned: "#EFF6FF",
    in_progress: "#F5F3FF",
    completed: "#ECFDF5",
    cancelled: "#FEF2F2",
  },

  issueType: {
    road_damage: "#EF4444",
    garbage: "#D97706",
    drainage: "#1A56DB",
    street_light: "#7C3AED",
  },

  gradient: {
    primary: ["#FFE566", "#F5C518"] as [string, string],
    secondary: ["#10B981", "#059669"] as [string, string],
    hero: ["#F5C518", "#C58A00"] as [string, string],
    card: ["#FFFDF5", "#FFF8DC"] as [string, string],
    dark: ["#1A2535", "#0F1A28"] as [string, string],
  },
};

export default Colors;
