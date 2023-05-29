"use client"

import CreateNoteButton from "../components/buttons/CreateNoteButton";
import ViewNotesButton from "../components/buttons/ViewNotesButton";

function HomePage() {
	return (
		<div className="flex flex-row items-center justify-center">
			<div className="flex flex-col items-left justify-center h-screen">
				<div className="mb-10 flex flex-col items-left justify">
					<h1 className="text-5xl font-bold">kNotex</h1>
					<p className="text-2xl font-light">take a note you fucking idiot</p>
				</div>
				<div className="flex flex-row items-stretch space-x-10">
					<CreateNoteButton></CreateNoteButton>
					<ViewNotesButton></ViewNotesButton>
				</div>
			</div>
		</div>
	)
}

export default HomePage;