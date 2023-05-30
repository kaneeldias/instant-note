"use client"

import CreateNoteButton from "../components/buttons/CreateNoteButton";
import ViewNotesButton from "../components/buttons/ViewNotesButton";

function HomePage() {
	return (
		<div className="flex flex-row items-center justify-center h-full">
			<div className="flex flex-col items-center sm:items-left justify-center">
				<div className="mb-10 flex flex-col items-left justify">
					<h1 className="text-3xl md:text-5xl font-bold">kNote v 0.1.0</h1>
					<p className="text-l md:text-2xl font-light">take a note you fucking idiot</p>
				</div>
				<div className="flex flex-row items-stretch space-x-10">
					<CreateNoteButton></CreateNoteButton>
				</div>
			</div>
		</div>
	)
}

export default HomePage;