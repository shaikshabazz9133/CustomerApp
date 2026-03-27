import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { BorderRadius, FontSize, Spacing } from "../../constants/theme";
import { Complaint } from "../../data/types";
import { COMPLAINT_STATUS_LABELS } from "../../constants";
import { formatRelativeTime } from "../../utils/helpers";

interface ComplaintCardProps {
  complaint: Complaint;
  onPress: (complaint: Complaint) => void;
}

const ISSUE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  road_damage: "construct",
  garbage: "trash",
  drainage: "water",
  street_light: "bulb",
};

const ISSUE_LABELS: Record<string, string> = {
  road_damage: "Road Damage",
  garbage: "Garbage Issue",
  drainage: "Drainage Issue",
  street_light: "Street Light",
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const statusColor = Colors.status[complaint.status] ?? Colors.textSecondary;
  const statusBg = Colors.statusBg[complaint.status] ?? Colors.background;
  const issueColor = Colors.issueType[complaint.issueType] ?? Colors.primary;

  return (
    <AnimatedTouchable
      style={[styles.card, animatedStyle]}
      onPress={() => onPress(complaint)}
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      activeOpacity={1}
    >
      <View style={styles.header}>
        <View
          style={[styles.issueIcon, { backgroundColor: `${issueColor}18` }]}
        >
          <Ionicons
            name={ISSUE_ICONS[complaint.issueType] ?? "alert-circle"}
            size={20}
            color={issueColor}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.issueLabel}>
            {ISSUE_LABELS[complaint.issueType]}
          </Text>
          <Text style={styles.complaintNumber}>
            {complaint.complaintNumber}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {COMPLAINT_STATUS_LABELS[complaint.status]}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {complaint.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Ionicons
            name="location-outline"
            size={13}
            color={Colors.textSecondary}
          />
          <Text style={styles.location} numberOfLines={1}>
            {complaint.location ?? `Ward ${complaint.wardNumber}`}
          </Text>
        </View>
        <Text style={styles.timestamp}>
          {formatRelativeTime(complaint.createdAt)}
        </Text>
      </View>

      {complaint.status !== "submitted" && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              {
                width: getProgressWidth(complaint.status),
                backgroundColor: statusColor,
              },
            ]}
          />
        </View>
      )}
    </AnimatedTouchable>
  );
};

function getProgressWidth(status: string): string {
  const map: Record<string, string> = {
    submitted: "10%",
    assigned: "35%",
    in_progress: "65%",
    completed: "100%",
    cancelled: "0%",
  };
  return map[status] ?? "0%";
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: "rgba(15,23,42,0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  issueIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  headerText: { flex: 1 },
  issueLabel: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text,
  },
  complaintNumber: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: "600",
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  location: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    flex: 1,
  },
  timestamp: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginTop: Spacing.sm,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 2,
  },
});

export default ComplaintCard;
