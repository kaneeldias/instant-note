"use client"

import Link from "next/link";
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToNotesList } from '../../app/GlobalRedux/Features/noteList/noteListSlicer';
import { RootState } from "@/app/GlobalRedux/store";
import { usePathname, useSearchParams } from 'next/navigation';
import CreateNoteButton from "../buttons/CreateNoteButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetNotesResponseElement } from "@/app/types/note-types";

const getNotes = async function ({ queryKey }: { queryKey: [string, string | null] }): Promise<GetNotesResponseElement[]> {
	const [_, hasNotes] = queryKey;
	if (!hasNotes) return [];

	const ids = JSON.parse(hasNotes);
	if (ids.length === 0) {
		return [];
	}

	const notes = await fetch(`/api/note/?ids=${encodeURIComponent(ids)}`, {
		method: "GET",
	});
	return await notes.json();
}

export default function NoteListPanel() {

	let hasNotes: string | null = null;
	if (typeof window !== "undefined") {
		hasNotes = localStorage.getItem("notes");
	}

	const { data } = useQuery(["hasNotes", hasNotes], getNotes);
	const notes = data ?? [];

	// let notes: GetNotesResponseElement[] = use(getNotes(hasNotes));
	notes.sort((a, b) => (a.lastModifiedAt < b.lastModifiedAt) ? 1 : ((b.lastModifiedAt < a.lastModifiedAt) ? -1 : 0))

	const dispatch = useDispatch();
	useEffect(() => {
		for (let note of notes) {
			dispatch(addToNotesList(note));
		}
	}, [notes]);

	const notesRedux = useSelector((state: RootState) => state.noteList).notesList;

	const noteId = usePathname().split("/")[2];

	return (
		<div className="bg-slate-600 flex flex-col space-y-3 p-5 min-w-[250px]" >
			<div className="mb-5">
				<CreateNoteButton></CreateNoteButton>
			</div>
			{
				notesRedux.map(({ id, title }) => {
					return (
						<Link href={`/note/${id}`} key={id}>
							<div className={(noteId === id ? "border-solid border-2 border-yellow-500 " : "") + "bg-slate-700 p-3 rounded-lg text-xs hover:bg-slate-400 transition-all duration-300 hover:"}>{title}</div>
						</Link>
					)
				})
			}
		</div>
	)
}