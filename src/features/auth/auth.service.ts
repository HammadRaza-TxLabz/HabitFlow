
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from "@/config/firebase";

// Register a new user
export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    await updateProfile(userCredential.user, {
        displayName: name.trim(),
    });

    return userCredential.user;
};

// Login an existing user
export const loginUser = async (
    email: string,
    password: string
) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    return userCredential.user;
};

// Logout the current user
export const logoutUser = async () => {
    await signOut(auth);
};

// Reset Password
export const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
};
