import React, { useState, forwardRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Colors from "../../constants/colors";
import { BorderRadius, FontSize, Spacing } from "../../constants/theme";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helper,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const borderColor = useSharedValue(Colors.border);

    const animatedBorder = useAnimatedStyle(() => ({
      borderColor: borderColor.value,
    }));

    const handleFocus = (e: any) => {
      setFocused(true);
      borderColor.value = withTiming(Colors.primary, { duration: 200 });
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setFocused(false);
      borderColor.value = withTiming(error ? Colors.error : Colors.border, {
        duration: 200,
      });
      props.onBlur?.(e);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Animated.View
          style={[
            styles.inputWrapper,
            animatedBorder,
            error ? styles.errorBorder : null,
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[styles.input, leftIcon ? styles.inputWithLeft : null]}
            placeholderTextColor={Colors.textTertiary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon && (
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </Animated.View>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : helper ? (
          <Text style={styles.helper}>{helper}</Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  label: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    minHeight: 52,
  },
  errorBorder: { borderColor: Colors.error },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  inputWithLeft: { paddingLeft: 4 },
  leftIcon: { paddingLeft: Spacing.md },
  rightIcon: { paddingRight: Spacing.md },
  error: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: 4,
  },
  helper: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default Input;
