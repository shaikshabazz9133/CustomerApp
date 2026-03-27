import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../../store/authStore";
import { useComplaintStore } from "../../store/complaintStore";
import { RaiseComplaintScreenProps } from "../../navigation/types";
import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";
import { IssueType } from "../../data/types";
import { ISSUE_TYPES, WARDS } from "../../constants";

const RaiseComplaintScreen: React.FC<RaiseComplaintScreenProps> = ({
  navigation,
}) => {
  const { customer } = useAuthStore();
  const { draft, updateDraft, submitComplaint, isSubmitting, resetDraft } =
    useComplaintStore();

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow photo library access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });
    if (!result.canceled) {
      updateDraft({ imageUri: result.assets[0].uri });
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow camera access.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });
    if (!result.canceled) {
      updateDraft({ imageUri: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (!customer) return;
    if (!draft.issueType) {
      Alert.alert("Select Issue Type", "Please select the type of issue.");
      return;
    }
    if (!draft.description.trim() || draft.description.trim().length < 20) {
      Alert.alert(
        "Description Required",
        "Please provide a description of at least 20 characters.",
      );
      return;
    }

    const result = await submitComplaint(customer.id);
    if (result) {
      Alert.alert(
        "✅ Complaint Submitted",
        `Your complaint ${result.complaintNumber} has been registered successfully. You'll be notified of updates.`,
        [
          {
            text: "Track Complaint",
            onPress: () => {
              resetDraft();
              navigation.replace("ComplaintTracker", {
                complaintId: result.id,
              });
            },
          },
          {
            text: "Go Home",
            onPress: () => {
              resetDraft();
              navigation.navigate("HomeScreen");
            },
          },
        ],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise Complaint</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Issue Type */}
        <Text style={styles.label}>
          Issue Type <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.issueGrid}>
          {ISSUE_TYPES.map((type) => {
            const selected = draft.issueType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.issueCard,
                  selected && {
                    borderColor: type.color,
                    backgroundColor: `${type.color}10`,
                  },
                ]}
                onPress={() => updateDraft({ issueType: type.id as IssueType })}
              >
                <View
                  style={[
                    styles.issueIcon,
                    {
                      backgroundColor: selected
                        ? `${type.color}20`
                        : Colors.background,
                    },
                  ]}
                >
                  <Ionicons
                    name={type.icon as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color={selected ? type.color : Colors.textSecondary}
                  />
                </View>
                <Text
                  style={[
                    styles.issueLabel,
                    selected && { color: type.color, fontWeight: "700" },
                  ]}
                >
                  {type.label}
                </Text>
                {selected && (
                  <View
                    style={[styles.checkMark, { backgroundColor: type.color }]}
                  >
                    <Ionicons name="checkmark" size={10} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Ward */}
        <Text style={styles.label}>
          Ward Number <Text style={styles.required}>*</Text>
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.wardScroll}
        >
          <View style={styles.wardRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 23, 30].map((w) => (
              <TouchableOpacity
                key={w}
                style={[
                  styles.wardChip,
                  draft.wardNumber === w && styles.wardChipActive,
                ]}
                onPress={() => updateDraft({ wardNumber: w })}
              >
                <Text
                  style={[
                    styles.wardChipText,
                    draft.wardNumber === w && styles.wardChipTextActive,
                  ]}
                >
                  {w}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Description */}
        <Text style={styles.label}>
          Description <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe the issue in detail (location, severity, impact)..."
          placeholderTextColor={Colors.textTertiary}
          multiline
          numberOfLines={5}
          value={draft.description}
          onChangeText={(v) => updateDraft({ description: v })}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{draft.description.length} / 500</Text>

        {/* Location */}
        <Text style={styles.label}>Location (optional)</Text>
        <View style={styles.locationInput}>
          <Ionicons
            name="location-outline"
            size={20}
            color={Colors.textSecondary}
          />
          <TextInput
            style={styles.locationText}
            placeholder="e.g. Main Road, near School, Ward 12"
            placeholderTextColor={Colors.textTertiary}
            value={draft.location}
            onChangeText={(v) => updateDraft({ location: v })}
          />
        </View>

        {/* Image Upload */}
        <Text style={styles.label}>Attach Image (optional)</Text>
        {draft.imageUri ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: draft.imageUri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeImage}
              onPress={() => updateDraft({ imageUri: null })}
            >
              <Ionicons name="close-circle" size={28} color={Colors.error} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadRow}>
            <TouchableOpacity style={styles.uploadBtn} onPress={handleCamera}>
              <Ionicons name="camera" size={24} color={Colors.primary} />
              <Text style={styles.uploadText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={handleImagePick}
            >
              <Ionicons name="images" size={24} color={Colors.secondary} />
              <Text style={styles.uploadText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>
            Your complaint will be reviewed and assigned to a field worker
            within 24 hours.
          </Text>
        </View>

        <Button
          title={isSubmitting ? "Submitting..." : "Submit Complaint"}
          onPress={handleSubmit}
          loading={isSubmitting}
          style={styles.submitBtn}
        />

        <View style={{ height: 32 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
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
  scrollContent: { padding: Spacing.lg },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
    marginTop: Spacing.md,
  },
  required: { color: Colors.error },
  issueGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 4,
  },
  issueCard: {
    width: "47%",
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: 14,
    alignItems: "center",
    backgroundColor: Colors.surface,
    position: "relative",
  },
  issueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  issueLabel: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  checkMark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wardScroll: { marginBottom: 4 },
  wardRow: { flexDirection: "row", gap: 8, paddingBottom: 4 },
  wardChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  wardChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  wardChipText: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  wardChipTextActive: { color: Colors.primary },
  textArea: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    minHeight: 120,
    backgroundColor: Colors.surface,
  },
  charCount: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    textAlign: "right",
    marginTop: 4,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    backgroundColor: Colors.surface,
    height: 52,
    gap: 10,
  },
  locationText: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  imagePreview: {
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    position: "relative",
  },
  image: { width: "100%", height: 200, borderRadius: BorderRadius.md },
  removeImage: { position: "absolute", top: 8, right: 8 },
  uploadRow: { flexDirection: "row", gap: 12 },
  uploadBtn: {
    flex: 1,
    height: 80,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.surface,
  },
  uploadText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  infoBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: Colors.primaryLight,
    padding: 12,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    flex: 1,
    lineHeight: 18,
  },
  submitBtn: { marginTop: Spacing.sm },
});

export default RaiseComplaintScreen;
