import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const serviceAccount = require("./service-account.json");

if (!getApps().length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://<your-project-id>.firebaseio.com"
	});
}

const adminDb = admin.firestore();

export { adminDb };