import React from 'react'
import CreateNoteButton from "../buttons/CreateNoteButton"
import ViewNotesButton from "../buttons/ViewNotesButton"

export default function Header() {
	return (
		<div className="bg-slate-700 text-white p-5 px-8 flex flex-row space-x-10 items-center">
			<div className="flex-2 flex-col font-bold text-3xl">kNote</div>
			<div className="flex-grow"></div>
			<div className="flex flex-row space-x-5">
				<CreateNoteButton></CreateNoteButton>
			</div>
		</div >
	)
}
