import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
import { useComplaintStore } from "../../store/complaintStore";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";

const ProfileScreen: React.FC = () => {
  const { customer, logout } = useAuthStore();
  const { complaints } = useComplaintStore();

  const stats = {
    total: complaints.length,
    completed: complaints.filter((c) => c.status === "completed").length,
    active: complaints.filter(
      (c) =>
        c.status === "submitted" ||
        c.status === "assigned" ||
        c.status === "in_progress",
    ).length,
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const MenuItem: React.FC<{
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress?: () => void;
    color?: string;
    badge?: string;
  }> = ({ icon, label, onPress, color = Colors.text, badge }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={[styles.menuLabel, { color }]}>{label}</Text>
      {badge ? (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>{badge}</Text>
        </View>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={Colors.textTertiary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={Colors.gradient.hero} style={styles.header}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>{customer?.name ?? "Citizen"}</Text>
          <Text style={styles.phone}>+91 {customer?.phone}</Text>
          <View style={styles.wardBadge}>
            <Ionicons name="location" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.wardText}>Ward {customer?.wardNumber}</Text>
          </View>
          <View style={styles.wave} />
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: "Total", value: stats.total, color: Colors.primary },
            { label: "Active", value: stats.active, color: Colors.warning },
            {
              label: "Resolved",
              value: stats.completed,
              color: Colors.secondary,
            },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statValue, { color: s.color }]}>
                {s.value}
              </Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          {[
            {
              icon: "mail-outline" as const,
              label: "Email",
              value: customer?.email ?? "Not set",
            },
            {
              icon: "home-outline" as const,
              label: "Address",
              value: customer?.address ?? "Not set",
            },
            {
              icon: "calendar-outline" as const,
              label: "Member Since",
              value: "2024",
            },
          ].map((item) => (
            <View key={item.label} style={styles.infoRow}>
              <Ionicons
                name={item.icon}
                size={16}
                color={Colors.textSecondary}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue} numberOfLines={1}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <MenuItem
            icon="notifications-outline"
            label="Notification Preferences"
          />
          <MenuItem icon="language-outline" label="Language" badge="English" />
          <MenuItem icon="shield-outline" label="Privacy Policy" />
          <MenuItem icon="help-circle-outline" label="Help & Support" />
          <MenuItem
            icon="information-circle-outline"
            label="App Version"
            badge="1.0.0"
          />
        </View>

        <View style={styles.menuCard}>
          <MenuItem
            icon="log-out-outline"
            label="Logout"
            onPress={handleLogout}
            color={Colors.error}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: "center",
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  phone: {
    fontSize: FontSize.md,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  wardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  wardText: { fontSize: FontSize.sm, color: "#fff", fontWeight: "600" },
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
  statsRow: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: -1,
    shadowColor: "rgba(15,23,42,0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: Spacing.md,
  },
  statCard: { flex: 1, alignItems: "center" },
  statValue: { fontSize: FontSize.xxl, fontWeight: "800" },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: "rgba(15,23,42,0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    shadowColor: "rgba(15,23,42,0.06)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    paddingLeft: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: FontSize.xs, color: Colors.textSecondary },
  infoValue: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: "500",
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    lastChild: { borderBottomWidth: 0 },
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: { flex: 1, fontSize: FontSize.md, fontWeight: "500" },
  menuBadge: {
    backgroundColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  menuBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
});

export default ProfileScreen;
