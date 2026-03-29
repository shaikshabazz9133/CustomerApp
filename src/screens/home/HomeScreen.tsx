import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// ── Government Leaders Banner ─────────────────────────────────────
const GovernmentBanner: React.FC = () => (
  <LinearGradient
    colors={["#1A3654", "#C58A00", "#F5C518"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={bannerStyles.govtBanner}
  >
    <View style={bannerStyles.govtHeader}>
      <View style={bannerStyles.tdpBadge}>
        <Text style={bannerStyles.tdpText}>TDP</Text>
      </View>
      <Text style={bannerStyles.govtTitle}>Government of Andhra Pradesh</Text>
    </View>
    <View style={bannerStyles.leadersRow}>
      <View style={bannerStyles.leaderCard}>
        <Image
          source={require("../../../assets/images/cm.png")}
          style={bannerStyles.leaderPhoto}
          resizeMode="cover"
        />
        <View style={[bannerStyles.rolePill, { backgroundColor: "#F5C518" }]}>
          <Text style={[bannerStyles.rolePillText, { color: "#1A3654" }]}>
            CM
          </Text>
        </View>
        <Text style={bannerStyles.leaderName}>N. Chandrababu Naidu</Text>
        <Text style={bannerStyles.leaderTitle}>Chief Minister</Text>
      </View>
      <View style={bannerStyles.verticalDivider} />
      <View style={bannerStyles.leaderCard}>
        <Image
          source={require("../../../assets/images/deputy_cm.png")}
          style={bannerStyles.leaderPhoto}
          resizeMode="cover"
        />
        <View style={[bannerStyles.rolePill, { backgroundColor: "#1A3654" }]}>
          <Text style={bannerStyles.rolePillText}>Dy.CM</Text>
        </View>
        <Text style={bannerStyles.leaderName}>Pawan Kalyan</Text>
        <Text style={bannerStyles.leaderTitle}>Deputy Chief Minister</Text>
      </View>
    </View>
  </LinearGradient>
);

// ── Ward Corporator Card ─────────────────────────────────────────
const CorporatorCard: React.FC<{ wardNumber?: number }> = ({ wardNumber }) => (
  <View style={bannerStyles.corpCard}>
    <LinearGradient
      colors={["#1A3654", "#1A3654"]}
      style={bannerStyles.corpAccent}
    />
    <Image
      source={require("../../../assets/images/corporator.png")}
      style={bannerStyles.corpPhoto}
      resizeMode="cover"
    />
    <View style={bannerStyles.corpInfo}>
      <View style={bannerStyles.corpBadge}>
        <Ionicons name="location" size={12} color="#F5C518" />
        <Text style={bannerStyles.corpBadgeText}>
          Ward {wardNumber ?? "47"} Representative
        </Text>
      </View>
      <Text style={bannerStyles.corpName}>Ramakrishna</Text>
      <Text style={bannerStyles.corpTitle}>47th Ward Corporator</Text>
      <Text style={bannerStyles.corpParty}>Telugu Desam Party</Text>
    </View>
  </View>
);

const bannerStyles = StyleSheet.create({
  govtBanner: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: "rgba(197,138,0,0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  govtHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.25)",
    paddingBottom: 10,
  },
  tdpBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tdpText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1A3654",
    letterSpacing: 1.5,
  },
  govtTitle: { fontSize: 13, fontWeight: "700", color: "#FFFFFF", flex: 1 },
  leadersRow: { flexDirection: "row", justifyContent: "space-around" },
  leaderCard: { alignItems: "center", flex: 1 },
  leaderPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#F5C518",
    marginBottom: 6,
  },
  rolePill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  rolePillText: { fontSize: 10, fontWeight: "900", color: "#FFFFFF" },
  leaderName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  leaderTitle: {
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    marginTop: 2,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginHorizontal: 8,
  },
  // Corporator Card
  corpCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "rgba(197,138,0,0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F0E6B0",
  },
  corpAccent: { width: 6 },
  corpPhoto: {
    width: 90,
    height: 110,
    borderRadius: 0,
  },
  corpInfo: { flex: 1, padding: 12, justifyContent: "center" },
  corpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF8DC",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  corpBadgeText: { fontSize: 10, fontWeight: "600", color: "#C58A00" },
  corpName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1A2535",
    marginBottom: 2,
  },
  corpTitle: { fontSize: 12, color: "#64748B", marginBottom: 2 },
  corpParty: { fontSize: 11, fontWeight: "700", color: "#C58A00" },
});

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
          <Text style={styles.sectionTitle}>Your Government</Text>
        </View>
        <GovernmentBanner />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Ward Representative</Text>
        </View>
        <CorporatorCard wardNumber={customer?.wardNumber} />

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
