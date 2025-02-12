import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAcvNsCbcom7ftODiIrR5QUaMquRUVduAk",
    authDomain: "datatamroi.firebaseapp.com",
    projectId: "datatamroi",
    storageBucket: "datatamroi.firebasestorage.app",
    messagingSenderId: "195764678010",
    appId: "1:195764678010:web:6f33b75fc99d1e2e77fac3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };