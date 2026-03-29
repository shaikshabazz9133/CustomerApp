import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
import { LoginScreenProps } from "../../navigation/types";
import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";
import { isValidPhone } from "../../utils/helpers";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const { sendOTP, isLoading, error, clearError } = useAuthStore();

  const handleSendOTP = async () => {
    clearError();
    if (!isValidPhone(phone)) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }
    await sendOTP(phone);
    navigation.navigate("OTP", { phoneNumber: phone });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <LinearGradient colors={Colors.gradient.hero} style={styles.hero}>
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <Text style={{ fontSize: 36 }}>🏛️</Text>
            </View>
            <Text style={styles.heroTitle}>Welcome to NMC</Text>
            <Text style={styles.heroSub}>Nellore Municipal Corporation</Text>
          </View>
          <View style={styles.wave} />
        </LinearGradient>

        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Login with Mobile</Text>
          <Text style={styles.subtitle}>
            We'll send a one-time password to verify your number
          </Text>

          <View style={styles.phoneInput}>
            <View style={styles.countryCode}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.code}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="10-digit mobile number"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
              returnKeyType="done"
              onSubmitEditing={handleSendOTP}
            />
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Button
            title={isLoading ? "Sending OTP..." : "Send OTP"}
            onPress={handleSendOTP}
            loading={isLoading}
            disabled={phone.length < 10}
            style={styles.submitBtn}
          />

          <View style={styles.demoBox}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={Colors.primary}
            />
            <Text style={styles.demoText}>
              Demo: Use any valid 10-digit number. OTP: any 4 digits
            </Text>
          </View>

          <View style={styles.termsRow}>
            <Text style={styles.termsText}>By continuing, you agree to our </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.gradient.hero[0] as string },
  container: { flex: 1, backgroundColor: Colors.background },
  hero: {
    paddingTop: 32,
    paddingBottom: 60,
    alignItems: "center",
  },
  heroContent: { alignItems: "center", zIndex: 1 },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  heroSub: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
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
  formContainer: { flex: 1, backgroundColor: Colors.background },
  form: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.md,
    height: 54,
    overflow: "hidden",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    gap: 6,
    height: "100%",
    backgroundColor: Colors.surface,
  },
  flag: { fontSize: 20 },
  code: { fontSize: FontSize.md, fontWeight: "600", color: Colors.text },
  input: {
    flex: 1,
    fontSize: FontSize.lg,
    color: Colors.text,
    paddingHorizontal: 14,
    letterSpacing: 2,
    height: "100%",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.errorLight,
    padding: 10,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  errorText: { fontSize: FontSize.sm, color: Colors.error, flex: 1 },
  submitBtn: { marginVertical: Spacing.md },
  demoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primaryLight,
    padding: 12,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  demoText: { fontSize: FontSize.sm, color: Colors.primary, flex: 1 },
  termsRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  termsText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  termsLink: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default LoginScreen;
