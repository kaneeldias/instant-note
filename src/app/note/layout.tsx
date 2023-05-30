"use client"

import NoteListPanel from "@/components/layout/NoteListPanel";

export default function NotesLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<div className="flex sm:flex-row flex-col justify-center h-screen">
			<NoteListPanel></NoteListPanel>
			<div className="flex min-h-[300px] h-screen justify-center min-w-[500px] max-w-[1000px] w-full sm:mt-5 rounded-lg">
				{children}
			</div>
		</div >
	)
}
