import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { Complaint } from '../data/types';

// Root Navigator
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

// Auth Navigator
export type AuthStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string };
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Notifications: undefined;
  Profile: undefined;
};

// Home Stack (nested inside Home tab)
export type HomeStackParamList = {
  HomeScreen: undefined;
  RaiseComplaint: undefined;
  ComplaintTracker: { complaintId: string };
};

// ─── Screen Props Types ───────────────────────────────────────────────────────
export type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type OTPScreenProps = StackScreenProps<AuthStackParamList, 'OTP'>;

export type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, 'HomeScreen'>,
  BottomTabScreenProps<MainTabParamList>
>;

export type RaiseComplaintScreenProps = StackScreenProps<HomeStackParamList, 'RaiseComplaint'>;
export type ComplaintTrackerScreenProps = StackScreenProps<HomeStackParamList, 'ComplaintTracker'>;

export type HistoryScreenProps = BottomTabScreenProps<MainTabParamList, 'History'>;
export type NotificationsScreenProps = BottomTabScreenProps<MainTabParamList, 'Notifications'>;
export type ProfileScreenProps = BottomTabScreenProps<MainTabParamList, 'Profile'>;
