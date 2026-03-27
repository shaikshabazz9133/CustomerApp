import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useComplaintStore } from "../../store/complaintStore";
import StatusTimeline from "../../components/complaint/StatusTimeline";
import { ComplaintTrackerScreenProps } from "../../navigation/types";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";
import { mockComplaints } from "../../data/mockComplaints";
import { formatDateTime } from "../../utils/helpers";
import { COMPLAINT_STATUS_LABELS } from "../../constants";

const ISSUE_LABELS: Record<string, string> = {
  road_damage: "Road Damage",
  garbage: "Garbage Issue",
  drainage: "Drainage Issue",
  street_light: "Street Light Issue",
};

const ComplaintTrackerScreen: React.FC<ComplaintTrackerScreenProps> = ({
  navigation,
  route,
}) => {
  const { complaintId } = route.params;
  const { complaints, selectedComplaint } = useComplaintStore();

  const complaint =
    selectedComplaint?.id === complaintId
      ? selectedComplaint
      : (complaints.find((c) => c.id === complaintId) ??
        mockComplaints.find((c) => c.id === complaintId));

  if (!complaint) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Complaint not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: Colors.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusColor = Colors.status[complaint.status] ?? Colors.textSecondary;
  const statusBg = Colors.statusBg[complaint.status] ?? Colors.background;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Complaint</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Complaint ID + Status */}
        <View style={styles.topCard}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.complaintNo}>
                {complaint.complaintNumber}
              </Text>
              <Text style={styles.submittedAt}>
                Submitted: {formatDateTime(complaint.createdAt)}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
              <View
                style={[styles.statusDot, { backgroundColor: statusColor }]}
              />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {COMPLAINT_STATUS_LABELS[complaint.status]}
              </Text>
            </View>
          </View>

          {/* Issue type */}
          <View style={styles.issueRow}>
            <View
              style={[
                styles.issueIcon,
                {
                  backgroundColor: `${Colors.issueType[complaint.issueType] ?? Colors.primary}18`,
                },
              ]}
            >
              <Ionicons
                name="construct"
                size={18}
                color={Colors.issueType[complaint.issueType] ?? Colors.primary}
              />
            </View>
            <View>
              <Text style={styles.issueType}>
                {ISSUE_LABELS[complaint.issueType]}
              </Text>
              {complaint.location && (
                <View style={styles.locRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={Colors.textSecondary}
                  />
                  <Text style={styles.location}>{complaint.location}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{complaint.description}</Text>
        </View>

        {/* Image */}
        {complaint.imageUri && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attached Image</Text>
            <Image
              source={{ uri: complaint.imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Assigned Employee */}
        {complaint.assignedEmployeeName && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assigned To</Text>
            <View style={styles.employeeCard}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={22} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.employeeName}>
                  {complaint.assignedEmployeeName}
                </Text>
                <Text style={styles.employeeRole}>
                  Field Worker · Ward {complaint.wardNumber}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Timeline</Text>
          <StatusTimeline
            timeline={complaint.timeline}
            currentStatus={complaint.status}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  notFoundText: { fontSize: FontSize.lg, color: Colors.textSecondary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  back: { padding: 4 },
  headerTitle: { fontSize: FontSize.lg, fontWeight: "700", color: Colors.text },
  body: { flex: 1 },
  topCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: "rgba(15,23,42,0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  complaintNo: { fontSize: FontSize.lg, fontWeight: "800", color: Colors.text },
  submittedAt: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 5,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: FontSize.xs, fontWeight: "700" },
  issueRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  issueIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  issueType: { fontSize: FontSize.md, fontWeight: "700", color: Colors.text },
  locRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 4 },
  location: { fontSize: FontSize.xs, color: Colors.textSecondary },
  section: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.border,
  },
  employeeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  employeeName: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text,
  },
  employeeRole: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 3,
  },
});

export default ComplaintTrackerScreen;
