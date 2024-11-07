import {
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth"

import {auth} from "$lib/firebase/firebase.client.js";
import {writable} from "svelte/store";

export const authStore = writable({
    isLoading: true,
    currentUser: null
})

export const authHandlers = {
    login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    },
    signup: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    },
    signup_google: async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    },
    logout: async () => {
        await signOut(auth)
    },
    resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email)
    },
    updateEmail: async (email) => {
        await updateEmail(auth, email)
    },
    updatePassword: async (password) => {
        await updatePassword(auth, password)
    }
}