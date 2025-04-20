import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";  // Added Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyAAoece0_3vgEkK0c5-IzqQoYwvEiAAHyQ",
    authDomain: "club-manager-3d471.firebaseapp.com",
    projectId: "club-manager-3d471",
    storageBucket: "club-manager-3d471.firebasestorage.app",
    messagingSenderId: "811354374081",
    appId: "1:811354374081:web:6ebf8de64ed81164cbf940",
    measurementId: "G-66SQK6K36W"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore();
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {});
export const FIRESTORAGE = getStorage()
export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP); // Initialize Realtime Database