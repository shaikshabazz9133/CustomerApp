import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationStore } from "../../store/notificationStore";
import { useAuthStore } from "../../store/authStore";
import EmptyState from "../../components/common/EmptyState";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";
import { AppNotification } from "../../data/types";
import { formatRelativeTime } from "../../utils/helpers";

const TYPE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  complaint_update: "notifications",
  assignment: "person-add",
  announcement: "megaphone",
  reminder: "star",
};

const TYPE_COLORS: Record<string, string> = {
  complaint_update: Colors.primary,
  assignment: Colors.secondary,
  announcement: Colors.warning,
  reminder: "#8B5CF6",
};

const NotificationsScreen: React.FC = () => {
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    loadNotifications,
  } = useNotificationStore();
  const { customer } = useAuthStore();

  useEffect(() => {
    if (customer) loadNotifications(customer.id);
  }, [customer?.id]);

  const renderItem = ({ item }: { item: AppNotification }) => {
    const color = TYPE_COLORS[item.type] ?? Colors.primary;
    return (
      <TouchableOpacity
        style={[styles.notifCard, !item.read && styles.unread]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.75}
      >
        <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
          <Ionicons
            name={TYPE_ICONS[item.type] ?? "notifications"}
            size={20}
            color={color}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            {!item.read && (
              <View style={[styles.dot, { backgroundColor: color }]} />
            )}
          </View>
          <Text style={styles.message} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.time}>{formatRelativeTime(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead} style={styles.markAllBtn}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="notifications-off-outline"
            title="No Notifications"
            subtitle="You'll receive updates here when your complaints are processed."
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 56,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: "800", color: Colors.text },
  unreadCount: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
    marginTop: 2,
  },
  markAllBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  markAllText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
  },
  list: { padding: Spacing.md, flexGrow: 1 },
  notifCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unread: {
    borderColor: `${Colors.primary}30`,
    backgroundColor: `${Colors.primary}05`,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  content: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.text,
    flex: 1,
  },
  dot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  message: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  time: { fontSize: FontSize.xs, color: Colors.textTertiary, marginTop: 6 },
});

export default NotificationsScreen;
