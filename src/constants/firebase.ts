// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// THAY THẾ BẰNG THÔNG TIN CỦA BẠN (Lấy từ Bước 1)
const firebaseConfig = {
  apiKey: "AIzaSyByVfIFtS0gMVPPdbqQs0lwvPEFxgSy7qg",
  authDomain: "my-wedding-website-78aa1.firebaseapp.com",
  projectId: "my-wedding-website-78aa1",
  storageBucket: "my-wedding-website-78aa1.firebasestorage.app",
  messagingSenderId: "776253470299",
  appId: "1:776253470299:web:b23e9c72de1837a17bb17e"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo và export Firestore
export const db = getFirestore(app);