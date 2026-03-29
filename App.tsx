import "react-native-gesture-handler";
import React, { useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/navigationRef";
import Colors from "./src/constants/colors";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
};

export default function App() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef} onReady={onLayoutRootView}>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
