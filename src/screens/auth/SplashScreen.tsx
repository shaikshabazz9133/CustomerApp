import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useAuthStore } from "../../store/authStore";
import Colors from "../../constants/colors";

type NavProp = StackNavigationProp<RootStackParamList, "Splash">;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const taglineOpacity = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const navigate = () => {
    navigation.replace(isAuthenticated ? "Main" : "Auth");
  };

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));

    const timer = setTimeout(() => {
      runOnJS(navigate)();
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={Colors.gradient.hero} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🏛️</Text>
        </View>
        <Text style={styles.appName}>NMC</Text>
        <Text style={styles.fullName}>Nellore Municipal Corporation</Text>
      </Animated.View>

      <Animated.View style={[styles.taglineContainer, taglineStyle]}>
        <Text style={styles.tagline}>Your City, Your Voice</Text>
        <Text style={styles.subTagline}>Citizen Complaint Portal</Text>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Smart City Initiative</Text>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  logoEmoji: { fontSize: 48 },
  appName: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 4,
  },
  fullName: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 1,
    marginTop: 4,
  },
  taglineContainer: { alignItems: "center" },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  subTagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  footer: {
    position: "absolute",
    bottom: 48,
    alignItems: "center",
    gap: 12,
  },
  footerText: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  dots: { flexDirection: "row", gap: 6 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: { backgroundColor: "#fff", width: 18 },
});

export default SplashScreen;
