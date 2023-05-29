import { CreateNoteRequest, GetNotesResponseElement } from "@/app/types/note-types";
import { getSLTimestamp } from "@/app/utils/time";
import admin from "firebase-admin";
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from "../../../../firebase-admin";
const httpConstants = require('http2').constants;

export async function POST(request: NextRequest) {
	const data: CreateNoteRequest = await request.json();

	const timestamp = getSLTimestamp();
	let doc;

	if (data.id) {
		doc = await adminDb.collection("notes").doc(data.id);
		await doc.set({
			...data,
			createdAt: timestamp,
			lastModifiedAt: timestamp
		});
	} else {
		doc = await adminDb.collection("notes").add({
			...data,
			createdAt: timestamp,
			lastModifiedAt: timestamp
		});
	}

	return NextResponse.json({ id: doc.id }, { status: httpConstants.HTTP_STATUS_CREATED })
}

export async function GET(request: NextRequest) {
	const idsString = request.nextUrl.searchParams.get("ids")!;
	const ids = idsString.split(",");

	if (ids.length === 0) return NextResponse.json([], { status: httpConstants.HTTP_STATUS_OK })


	const res: GetNotesResponseElement[] = [];
	const snapshot = await adminDb.collection("notes")
		.where(admin.firestore.FieldPath.documentId(), "in", ids)
		.get();

	snapshot.forEach(doc => {
		res.push({
			id: doc.id,
			title: getTitle(doc.data().title, doc.data().content),
			lastModifiedAt: doc.data().lastModifiedAt
		});
	});

	return NextResponse.json(res, { status: httpConstants.HTTP_STATUS_OK })
}


function getTitle(title: string, content: string) {
	if (title) {
		return trimToNearestWord(title, 25);
	}

	if (content) {
		return trimToNearestWord(content, 25);
	}

	return "Untitled";
}

function trimToNearestWord(str: string, maxLength: number) {
	if (str.length <= maxLength) {
		return str; // No need to trim
	}

	var trimmedStr = str.substring(0, maxLength); // Trim to specified length
	var lastSpaceIndex = trimmedStr.lastIndexOf(' ');

	if (lastSpaceIndex !== -1) {
		trimmedStr = trimmedStr.substring(0, lastSpaceIndex); // Trim to the last space
	}

	return trimmedStr;
}
