import { ReadNoteRequest, ReadNoteResponse } from "../types/note-types";
import UpdateNoteComponent from "../../components/UpdateNoteComponent";

async function getNote(id: string): Promise<ReadNoteResponse> {
	const note = await fetch(`${process.env.API_PATH}/note/${id}`, { cache: "no-store" });

	if (!note.ok) throw Error("Note not found");

	return await note.json();
}

export default async function ViewNote({ params }: { params: ReadNoteRequest }) {
	const id: string = params.id;

	let note: ReadNoteResponse;
	try {
		note = await getNote(id);
	} catch (e) {
		console.log(e);
		return <UpdateNoteComponent id={id} create={true} />
	}

	return (
		<UpdateNoteComponent note={note} id={id} />
	)
}
