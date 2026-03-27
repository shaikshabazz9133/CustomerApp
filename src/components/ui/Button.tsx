import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/colors";
import {
  BorderRadius,
  FontSize,
  FontWeight,
  Spacing,
} from "../../constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  fullWidth = true,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const heights = { sm: 40, md: 50, lg: 56 };
  const fontSizes = { sm: FontSize.sm, md: FontSize.md, lg: FontSize.lg };

  const isDisabled = disabled || loading;

  if (variant === "primary") {
    return (
      <Animated.View
        style={[animatedStyle, fullWidth && styles.fullWidth, style]}
      >
        <TouchableOpacity
          onPress={isDisabled ? undefined : onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          disabled={isDisabled}
        >
          <LinearGradient
            colors={
              isDisabled ? ["#94A3B8", "#94A3B8"] : Colors.gradient.primary
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.button,
              { height: heights[size] },
              styles.primaryBtn,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <View style={styles.innerRow}>
                {icon && iconPosition === "left" && (
                  <View style={styles.iconLeft}>{icon}</View>
                )}
                <Text
                  style={[
                    styles.primaryText,
                    { fontSize: fontSizes[size] },
                    textStyle,
                  ]}
                >
                  {title}
                </Text>
                {icon && iconPosition === "right" && (
                  <View style={styles.iconRight}>{icon}</View>
                )}
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const variantStyles: Record<string, ViewStyle> = {
    secondary: {
      backgroundColor: Colors.secondary,
      borderRadius: BorderRadius.md,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: Colors.primary,
      borderRadius: BorderRadius.md,
    },
    ghost: {
      backgroundColor: Colors.primaryLight,
      borderRadius: BorderRadius.md,
    },
    danger: {
      backgroundColor: Colors.error,
      borderRadius: BorderRadius.md,
    },
  };

  const variantTextColors: Record<string, string> = {
    secondary: "#fff",
    outline: Colors.primary,
    ghost: Colors.primary,
    danger: "#fff",
  };

  return (
    <AnimatedTouchable
      style={[
        styles.button,
        { height: heights[size] },
        variantStyles[variant],
        isDisabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? Colors.primary
              : "#fff"
          }
          size="small"
        />
      ) : (
        <View style={styles.innerRow}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              styles.text,
              { fontSize: fontSizes[size], color: variantTextColors[variant] },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
  },
  primaryBtn: {
    borderRadius: BorderRadius.md,
  },
  fullWidth: { width: "100%" },
  disabled: { opacity: 0.5 },
  text: {
    fontWeight: FontWeight.semibold,
  },
  primaryText: {
    color: "#fff",
    fontWeight: FontWeight.semibold,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});

export default Button;
