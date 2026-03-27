import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
import { useComplaintStore } from "../../store/complaintStore";
import { useNotificationStore } from "../../store/notificationStore";
import ComplaintCard from "../../components/complaint/ComplaintCard";
import FAButton from "../../components/common/FAButton";
import EmptyState from "../../components/common/EmptyState";
import { ComplaintCardSkeleton } from "../../components/common/SkeletonLoader";
import { HomeScreenProps } from "../../navigation/types";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";
import { Complaint } from "../../data/types";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { customer } = useAuthStore();
  const { complaints, isLoading, loadComplaints, selectComplaint } =
    useComplaintStore();
  const { loadNotifications, unreadCount } = useNotificationStore();

  const headerOpacity = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  useEffect(() => {
    if (customer) {
      loadComplaints(customer.id);
      loadNotifications(customer.id);
    }
    headerOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
  }, [customer?.id]);

  const handleComplaintPress = (complaint: Complaint) => {
    selectComplaint(complaint);
    navigation.navigate("ComplaintTracker", { complaintId: complaint.id });
  };

  const handleRefresh = useCallback(() => {
    if (customer) {
      loadComplaints(customer.id);
    }
  }, [customer]);

  const activeCount = complaints.filter(
    (c) =>
      c.status === "submitted" ||
      c.status === "assigned" ||
      c.status === "in_progress",
  ).length;
  const completedCount = complaints.filter(
    (c) => c.status === "completed",
  ).length;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient colors={Colors.gradient.hero} style={styles.header}>
        <Animated.View style={[styles.headerContent, headerStyle]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning 👋</Text>
              <Text style={styles.name}>{customer?.name ?? "Citizen"}</Text>
              <View style={styles.wardBadge}>
                <Ionicons
                  name="location"
                  size={12}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.wardText}>Ward {customer?.wardNumber}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notifBtn}
              onPress={() => navigation.getParent()?.navigate("Notifications")}
            >
              <Ionicons name="notifications" size={24} color="#fff" />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{complaints.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{activeCount}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedCount}</Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
          </View>
        </Animated.View>
        <View style={styles.wave} />
      </LinearGradient>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Complaints</Text>
          <TouchableOpacity
            onPress={() => navigation.getParent()?.navigate("History")}
          >
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <>
            <ComplaintCardSkeleton />
            <ComplaintCardSkeleton />
            <ComplaintCardSkeleton />
          </>
        ) : complaints.length === 0 ? (
          <EmptyState
            icon="document-text-outline"
            title="No Complaints Yet"
            subtitle="Tap the + button to raise your first complaint"
          />
        ) : (
          complaints
            .slice(0, 5)
            .map((c) => (
              <ComplaintCard
                key={c.id}
                complaint={c}
                onPress={handleComplaintPress}
              />
            ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <FAButton onPress={() => navigation.navigate("RaiseComplaint")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 52, paddingBottom: 60 },
  headerContent: { paddingHorizontal: Spacing.lg },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 2,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
  },
  wardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  wardText: {
    fontSize: FontSize.xs,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  notifBtn: { padding: 4, position: "relative" },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { fontSize: 10, color: "#fff", fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
  },
  statCard: { flex: 1, alignItems: "center" },
  statNumber: { fontSize: FontSize.xxl, fontWeight: "800", color: "#fff" },
  statLabel: {
    fontSize: FontSize.xs,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  body: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },
  seeAll: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: "600" },
});

export default HomeScreen;
