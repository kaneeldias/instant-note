import { ReadNoteRequest, ReadNoteResponse, UpdateNoteRequest } from "@/app/types/note-types";
import { getSLTimestamp } from "@/app/utils/time";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../../firebase-admin";
const httpConstants = require('http2').constants;

export async function GET(request: NextRequest, { params }: { params: ReadNoteRequest }) {
	const id = params.id;

	const doc = await adminDb.collection("notes").doc(id).get();

	if (!doc.exists) return NextResponse.json({}, { status: httpConstants.HTTP_STATUS_NOT_FOUND })

	const res: ReadNoteResponse = {
		id: doc.id,
		title: doc.data()!.title,
		content: doc.data()!.content
	}

	return NextResponse.json(res, { status: httpConstants.HTTP_STATUS_OK })
}

export async function PUT(request: NextRequest, { params }: { params: ReadNoteRequest }) {
	const id = params.id;
	const data: UpdateNoteRequest = await request.json();

	const timestamp = getSLTimestamp();
	const doc = await adminDb.collection("notes").doc(id);

	await doc.set({
		...data,
		lastModifiedAt: timestamp
	}, { merge: true });

	return NextResponse.json({}, { status: httpConstants.HTTP_STATUS_UPDATED })
}
