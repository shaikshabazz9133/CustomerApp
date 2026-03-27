import React from "react";
import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import { useComplaintStore } from "../../store/complaintStore";
import { useAuthStore } from "../../store/authStore";
import ComplaintCard from "../../components/complaint/ComplaintCard";
import EmptyState from "../../components/common/EmptyState";
import { ComplaintCardSkeleton } from "../../components/common/SkeletonLoader";
import Colors from "../../constants/colors";
import { FontSize, Spacing } from "../../constants/theme";
import { Complaint } from "../../data/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigation/types";

const HistoryScreen: React.FC = () => {
  const { complaints, isLoading, selectComplaint } = useComplaintStore();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const handlePress = (complaint: Complaint) => {
    selectComplaint(complaint);
    // Navigate via parent (Home tab stack)
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.header}>
        <Text style={styles.title}>My Complaints</Text>
        <Text style={styles.count}>{complaints.length} total</Text>
      </View>

      {isLoading ? (
        <View style={styles.list}>
          {[1, 2, 3].map((i) => (
            <ComplaintCardSkeleton key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ComplaintCard complaint={item} onPress={handlePress} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon="time-outline"
              title="No Complaint History"
              subtitle="All your past and current complaints will appear here."
            />
          }
        />
      )}
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { fontSize: FontSize.xl, fontWeight: "800", color: Colors.text },
  count: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600",
    color: Colors.primary,
  },
  list: { padding: Spacing.lg, flexGrow: 1 },
});

export default HistoryScreen;
