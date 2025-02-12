import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
  });
}

const db = admin.firestore();

export { admin, db };
