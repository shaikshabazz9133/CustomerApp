import React, { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Colors from "../../constants/colors";
import { BorderRadius } from "../../constants/theme";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

const SkeletonBox: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  borderRadius = BorderRadius.sm,
  style,
}) => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const ComplaintCardSkeleton: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <SkeletonBox width={40} height={40} borderRadius={12} />
      <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
        <SkeletonBox width="60%" height={14} />
        <SkeletonBox width="40%" height={11} />
      </View>
      <SkeletonBox width={70} height={24} borderRadius={12} />
    </View>
    <SkeletonBox height={13} style={{ marginTop: 10 }} />
    <SkeletonBox width="80%" height={13} style={{ marginTop: 6 }} />
    <View style={[styles.header, { marginTop: 12 }]}>
      <SkeletonBox width="50%" height={11} />
      <SkeletonBox width="25%" height={11} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    padding: 16,
    marginBottom: 12,
    shadowColor: "rgba(15,23,42,0.06)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default SkeletonBox;
