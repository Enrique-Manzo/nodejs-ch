import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(fs.readFileSync("database/firebase/config/e-commerce-home-space-firebase-adminsdk-ex56v-1a49c62dac.json", "utf-8"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  export default function getFirestoreApp() {
    return admin.firestore();
  }