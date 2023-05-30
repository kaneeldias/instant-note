"use client"

import Link from "next/link";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToNotesList } from '@/app/GlobalRedux/Features/noteList/noteListSlicer';
import { RootState } from "@/app/GlobalRedux/store";
import { usePathname } from 'next/navigation';
import CreateNoteButton from "../buttons/CreateNoteButton";
import { useQuery } from "@tanstack/react-query";
import { GetNotesResponseElement } from "@/app/types/note-types";

const getNotes = async function ({ queryKey }: { queryKey: [string, string | null] }): Promise<GetNotesResponseElement[]> {
	const [, hasNotes] = queryKey;
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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const notes = data ?? [];

	// let notes: GetNotesResponseElement[] = use(getNotes(hasNotes));
	notes.sort((a, b) => (a.lastModifiedAt < b.lastModifiedAt) ? 1 : ((b.lastModifiedAt < a.lastModifiedAt) ? -1 : 0))

	const dispatch = useDispatch();
	useEffect(() => {
		for (let note of notes) {
			dispatch(addToNotesList(note));
		}
	}, [dispatch, notes]);

	const notesRedux = useSelector((state: RootState) => state.noteList).notesList;
	const notesReduxTop3 = notesRedux.slice(0, 8);

	const noteId = usePathname().split("/")[2];

	return (
		<div className="bg-slate-600 flex sm:flex-col flex-row sm:space-y-3 space-x-3 sm:space-x-0 items-center sm:items-stretch sm:pt-5 sm:pr-5 min-w-[200px] w-full sm:w-[120px] overflow-y-hidden sm:h-full">
			<div className="sm:mb-5">
				<CreateNoteButton />
			</div>
			<div className="hidden sm:block flex-col sm:space-y-3 sm:overflow-y-scroll sm:h-full">
				{
					notesRedux.map(({ id, title }) => {
						return (
							<Link href={`/note/${id}`} key={id}>
								<div className={(noteId === id ? "border-solid border-2 border-yellow-500 " : "border-solid border-2 border-slate-200 ") + "bg-slate-700 p-3 rounded-lg text-xs hover:bg-slate-400 transition-all duration-300 whitespace-nowrap h-[48px] items-center sm:items-start justify-center align-middle mb-3"}>{title}</div>
							</Link>
						)
					})
				}
			</div>

			<div className="sm:hidden flex flex-row space-x-5 w-screen">
				<div className="flex flex-row shrink overflow-x-scroll space-x-5 max-w-full">
					{
						notesReduxTop3.map(({ id, title }) => {
							return (
								<Link href={`/note/${id}`} key={id}>
									<div className={(noteId === id ? "border-solid border-2 border-yellow-500 " : "border-solid border-2 border-slate-200 ") + "bg-slate-700 p-3 rounded-lg text-xs hover:bg-slate-400 transition-all duration-300 whitespace-nowrap h-[46px] items-center sm:items-start justify-center align-middle pt-3.5"}>{title}</div>
								</Link>
							)
						})
					}
				</div>
			</div>

		</div>
	)
}