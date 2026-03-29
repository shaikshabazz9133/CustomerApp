import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
import { OTPScreenProps } from "../../navigation/types";
import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";
import { FontSize, Spacing, BorderRadius } from "../../constants/theme";
import { OTP_LENGTH, OTP_TIMER } from "../../constants";

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(OTP_TIMER);
  const inputs = useRef<(TextInput | null)[]>([]);
  const { verifyOTP, isLoading, error, sendOTP, clearError } = useAuthStore();
  const shakeOffset = useSharedValue(0);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }],
  }));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    clearError();
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const triggerShake = () => {
    shakeOffset.value = withSequence(
      withTiming(-10),
      withTiming(10),
      withTiming(-8),
      withTiming(8),
      withTiming(-4),
      withTiming(0),
    );
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length < OTP_LENGTH) {
      Alert.alert("Incomplete OTP", "Please enter the full OTP.");
      return;
    }
    const success = await verifyOTP(otpString);
    if (!success) {
      triggerShake();
      setOtp(Array(OTP_LENGTH).fill(""));
      inputs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setTimer(OTP_TIMER);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputs.current[0]?.focus();
    await sendOTP(phoneNumber);
  };

  const maskedPhone = `${phoneNumber.slice(0, 2)}XXXXXX${phoneNumber.slice(-2)}`;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="phone-portrait" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to{"\n"}
          <Text style={styles.phone}>+91 {maskedPhone}</Text>
        </Text>

        <Animated.View style={[styles.otpRow, shakeStyle]}>
          {Array(OTP_LENGTH)
            .fill(null)
            .map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => {
                  inputs.current[i] = r;
                }}
                style={[
                  styles.otpBox,
                  otp[i] ? styles.otpBoxFilled : null,
                  error ? styles.otpBoxError : null,
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={otp[i]}
                onChangeText={(v) => handleChange(v, i)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, i)
                }
                textContentType="oneTimeCode"
              />
            ))}
        </Animated.View>

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={15} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Button
          title={isLoading ? "Verifying..." : "Verify & Login"}
          onPress={handleVerify}
          loading={isLoading}
          disabled={otp.join("").length < OTP_LENGTH}
          style={styles.btn}
        />

        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend OTP in{" "}
              <Text style={{ color: Colors.primary, fontWeight: "700" }}>
                {timer}s
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.demoBox}>
          <Text style={styles.demoText}>
            💡 Demo: Enter any 4 digits to login
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, backgroundColor: Colors.background },
  back: { position: "absolute", top: 12, left: 20, zIndex: 10, padding: 8 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 36,
  },
  phone: { color: Colors.primary, fontWeight: "700" },
  otpRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  otpBox: {
    width: 60,
    height: 64,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  otpBoxError: { borderColor: Colors.error },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.errorLight,
    padding: 10,
    borderRadius: BorderRadius.sm,
    marginBottom: 16,
    width: "100%",
  },
  errorText: { fontSize: FontSize.sm, color: Colors.error },
  btn: { width: "100%", marginBottom: Spacing.md },
  resendRow: { marginBottom: Spacing.md },
  timerText: { fontSize: FontSize.md, color: Colors.textSecondary },
  resendText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: "700",
  },
  demoBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
  },
  demoText: { fontSize: FontSize.sm, color: Colors.primary },
});

export default OTPScreen;
