
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import {
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

import { auth } from '@/config/firebase';

// Enable after company EAS development build is ready
const GOOGLE_SIGN_IN_ENABLED = false;

export const signInWithGoogle = async () => {
  // Temporary guard until native build is ready
  if (!GOOGLE_SIGN_IN_ENABLED) {
    throw new Error('GOOGLE_SIGN_IN_EXPO_GO');
  }

  // Prevent native module access in Expo Go
  if (
    Constants.executionEnvironment === 'storeClient' ||
    Constants.appOwnership === 'expo'
  ) {
    throw new Error('GOOGLE_SIGN_IN_EXPO_GO');
  }

  const webClientId =
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  if (!webClientId) {
    throw new Error('Google Web Client ID is missing');
  }

  const {
    GoogleSignin,
    isSuccessResponse,
  } = await import(
    '@react-native-google-signin/google-signin'
  );

  GoogleSignin.configure({
    webClientId,
  });

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
  }

  const response = await GoogleSignin.signIn();

  if (!isSuccessResponse(response)) {
    return null;
  }

  const idToken = response.data.idToken;

  if (!idToken) {
    throw new Error('Google ID token not received');
  }

  const credential =
    GoogleAuthProvider.credential(idToken);

  const userCredential = await signInWithCredential(
    auth,
    credential
  );

  return userCredential.user;
};
