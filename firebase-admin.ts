import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

if (!getApps().length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: "tiktok",
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
		})
	});
}

const adminDb = admin.firestore();

export { adminDb };