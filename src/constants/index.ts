export { default as Colors } from "./colors";
export {
  Spacing,
  BorderRadius,
  FontSize,
  FontWeight,
  Shadow,
  CommonStyles,
} from "./theme";

export const APP_NAME = "Nellore Municipal Corporation";
export const APP_SHORT_NAME = "NMC";
export const OTP_LENGTH = 4;
export const OTP_TIMER = 30;

export const ISSUE_TYPES = [
  { id: "road_damage", label: "Road Damage", icon: "road", color: "#EF4444" },
  { id: "garbage", label: "Garbage Issue", icon: "trash", color: "#F59E0B" },
  { id: "drainage", label: "Drainage Issue", icon: "water", color: "#3B82F6" },
  {
    id: "street_light",
    label: "Street Light",
    icon: "lightbulb",
    color: "#8B5CF6",
  },
] as const;

export const COMPLAINT_STATUS_LABELS: Record<string, string> = {
  submitted: "Submitted",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const WARDS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  label: `Ward ${i + 1}`,
}));
