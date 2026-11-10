
import { FirebaseError } from "firebase/app";

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/email-already-in-use":
        return "An account with this email already exists.";

      case "auth/weak-password":
        return "Password must be at least 6 characters long.";

      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      case "auth/user-disabled":
        return "This account has been disabled.";

      default:
        return "Authentication failed. Please try again.";
    }
  }

  return "Something went wrong. Please try again.";
};
