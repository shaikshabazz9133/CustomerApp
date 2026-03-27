import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { BorderRadius, FontSize, Spacing } from "../../constants/theme";
import { TimelineEvent, ComplaintStatus } from "../../data/types";
import { COMPLAINT_STATUS_LABELS } from "../../constants";
import { formatDateTime } from "../../utils/helpers";

interface StatusTimelineProps {
  timeline: TimelineEvent[];
  currentStatus: ComplaintStatus;
}

const ALL_STATUSES: ComplaintStatus[] = [
  "submitted",
  "assigned",
  "in_progress",
  "completed",
];

const STATUS_ICONS: Record<ComplaintStatus, keyof typeof Ionicons.glyphMap> = {
  submitted: "cloud-upload",
  assigned: "person-add",
  in_progress: "construct",
  completed: "checkmark-circle",
  cancelled: "close-circle",
};

const StatusTimeline: React.FC<StatusTimelineProps> = ({
  timeline,
  currentStatus,
}) => {
  const getEventForStatus = (status: ComplaintStatus) =>
    timeline.find((e) => e.status === status);

  const isCompleted = (status: ComplaintStatus): boolean => {
    const order = ALL_STATUSES.indexOf(status);
    const currentOrder = ALL_STATUSES.indexOf(currentStatus);
    return order <= currentOrder;
  };

  return (
    <View style={styles.container}>
      {ALL_STATUSES.map((status, index) => {
        const event = getEventForStatus(status);
        const completed = isCompleted(status);
        const isActive = status === currentStatus;
        const color = completed ? Colors.status[status] : Colors.border;

        return (
          <View key={status} style={styles.step}>
            {/* Connector line */}
            {index > 0 && (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor: isCompleted(ALL_STATUSES[index - 1])
                      ? Colors.secondary
                      : Colors.border,
                  },
                ]}
              />
            )}

            <View style={styles.stepRow}>
              {/* Icon circle */}
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: completed
                      ? `${color}18`
                      : Colors.background,
                    borderColor: completed ? color : Colors.border,
                    borderWidth: isActive ? 2.5 : 1.5,
                  },
                ]}
              >
                <Ionicons
                  name={STATUS_ICONS[status]}
                  size={16}
                  color={completed ? color : Colors.textTertiary}
                />
              </View>

              {/* Text */}
              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    completed
                      ? styles.stepTitleActive
                      : styles.stepTitleInactive,
                  ]}
                >
                  {COMPLAINT_STATUS_LABELS[status]}
                </Text>
                {event ? (
                  <>
                    <Text style={styles.stepNote}>{event.note}</Text>
                    <Text style={styles.stepTime}>
                      {formatDateTime(event.timestamp)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.stepPending}>Pending</Text>
                )}
              </View>

              {completed && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={Colors.secondary}
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: Spacing.sm },
  step: { paddingLeft: 8 },
  connector: {
    width: 2,
    height: 24,
    marginLeft: 19,
    marginVertical: -2,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    paddingVertical: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  stepContent: { flex: 1 },
  stepTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    marginBottom: 2,
  },
  stepTitleActive: { color: Colors.text },
  stepTitleInactive: { color: Colors.textTertiary },
  stepNote: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  stepTime: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 3,
  },
  stepPending: {
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
    fontStyle: "italic",
  },
});

export default StatusTimeline;
