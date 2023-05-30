"use client"

import React, { useEffect, useRef, useState } from 'react';
import { UpdateNoteRequest } from "../types/note-types";
import TextField from "@/components/inputs/TextField";
import TextArea from "@/components/inputs/TextArea";
import ActionButton from "@/components/buttons/Button";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { addToNotesList, removeFromNotesList, updateNoteInNotesList } from '../GlobalRedux/Features/noteList/noteListSlicer';
import { getSLTimestamp } from "../utils/time";
import { getTitle } from "../utils/notes";
import DeleteNoteButton from "@/components/buttons/DeleteNoteButton";
import AddNoteButton from "@/components/buttons/AddNoteButton";

export const useLoaded = () => {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => setLoaded(true), []);
	return loaded;
};

export default function UpdateNoteComponent({ note = { title: "", content: "" }, id, create = false }: { note?: UpdateNoteRequest, id?: string, create?: boolean }) {

	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const [isSaving, setIsSaving] = useState(false);

	const loaded = useLoaded();

	const router = useRouter();
	const dispatch = useDispatch();

	const updateNote = async function () {
		const updateNoteRequest: UpdateNoteRequest = {
			title: title,
			content: content
		}

		setIsSaving(true);

		let res;
		if (create) {
			res = await fetch(`/api/note`, {
				method: "POST",
				body: JSON.stringify({
					id: id,
					...updateNoteRequest
				})
			});
		} else {
			res = await fetch(`/api/note/${id}`, {
				method: "PUT",
				body: JSON.stringify(updateNoteRequest)
			});
		}

		if (!res.ok) {
			throw new Error(res.statusText);
		}

		setIsSaving(false);

		id = (await res.json()).id;

		if (create) {
			toast.success("Note created successfully");
			router.push(`/note/${id}`);

			const hasNotes = localStorage.getItem("notes");
			if (hasNotes && Array.isArray(JSON.parse(hasNotes))) {
				const notes: string[] = JSON.parse(localStorage.getItem("notes")!);
				notes.push(id!);
				localStorage.setItem("notes", JSON.stringify(notes));
			} else {
				localStorage.setItem("notes", JSON.stringify([id]));
			}

			dispatch(addToNotesList({ id: id, title: getTitle(title, content), lastModifiedAt: getSLTimestamp() }));
		} else {
			toast.success("Note updated successfully");
		}

		router.refresh();
	}

	const deleteNote = function () {
		const hasNotes = localStorage.getItem("notes");
		if (!hasNotes) return;

		const notes: string[] = JSON.parse(hasNotes);
		const index = notes.indexOf(id!);
		if (index > -1) {
			notes.splice(index, 1);
		}
		localStorage.setItem("notes", JSON.stringify(notes));
		dispatch(removeFromNotesList(id));
		router.push("/note");
	}

	const hasNote = function (id: string): boolean {
		let hasNotes;
		if (typeof window !== "undefined") hasNotes = localStorage.getItem("notes");
		if (!hasNotes) {
			return false;
		}

		const notes: string[] = JSON.parse(hasNotes);
		return notes.includes(id);
	}

	const addNote = function () {
		let hasNotes = localStorage.getItem("notes");
		if (!hasNotes) hasNotes = "[]";

		const notes: string[] = JSON.parse(hasNotes);
		notes.push(id!);
		if (typeof window !== "undefined") localStorage.setItem("notes", JSON.stringify(notes));
		dispatch(addToNotesList({ id: id, title: getTitle(title, content), lastModifiedAt: getSLTimestamp() }));
		router.refresh();
	}

	const firstUpdate = useRef(0);

	useEffect(() => {
		dispatch(updateNoteInNotesList({ id: id, title: getTitle(title, content), lastModifiedAt: getSLTimestamp() }));
		if (firstUpdate.current < 2) {
			firstUpdate.current = firstUpdate.current + 1;
			return;
		}

		const timeOutId = setTimeout(() => updateNote(), 1000);
		return () => clearTimeout(timeOutId);
	}, [title, content]);

	return (
		<div className="flex flex-col space-y-5 w-full">
			<div className="justify-end mb-3 space-x-5 hidden sm:inline-flex sm:w-full items-end flex flex-row ">
				{!isSaving && (
					<ActionButton onClick={updateNote}>
						<CheckCircleIcon className="h-6 w-6"></CheckCircleIcon>
						<span>SAVE</span>
					</ActionButton>
				)
				}

				{
					isSaving && (
						<ActionButton disabled>
							<div
								className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
								role="status">
								<span
									className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
								>Loading...</span>
							</div>
							<span>SAVING</span>
						</ActionButton>
					)
				}

				{!create && !loaded && (
					<DeleteNoteButton />
				)}

				{!create && hasNote(id!) && loaded && (
					<DeleteNoteButton onClick={deleteNote} />
				)}

				{!create && !hasNote(id!) && loaded && (
					<AddNoteButton onClick={addNote} />
				)}
			</div>

			<div className="flex flex-col w-full items-center space-y-3 bg-slate-200 p-5 rounded-lg h-screen" >
				<TextField
					name="title" placeholder="title"
					value={title}
					onChange={e => { setTitle(e.currentTarget.value); }}>
				</TextField>
				<TextArea
					name="content" placeholder="content"
					value={content}
					onChange={e => { setContent(e.currentTarget.value); }}
					autoFocus>
				</TextArea>
			</div>

			<div className="flex justify-end mb-3 space-x-5 block sm:hidden">
				{!isSaving && (
					<ActionButton onClick={updateNote}>
						<CheckCircleIcon className="h-6 w-6"></CheckCircleIcon>
						<span>SAVE</span>
					</ActionButton>
				)
				}

				{
					isSaving && (
						<ActionButton disabled>
							<div
								className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
								role="status">
								<span
									className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
								>Loading...</span>
							</div>
							<span>SAVING</span>
						</ActionButton>
					)
				}

				{!create && !loaded && (
					<DeleteNoteButton />
				)}

				{!create && hasNote(id!) && loaded && (
					<DeleteNoteButton onClick={deleteNote} />
				)}

				{!create && !hasNote(id!) && loaded && (
					<AddNoteButton onClick={addNote} />
				)}
			</div>

		</div>
	)
}