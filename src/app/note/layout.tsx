"use client"

import NoteListPanel from "@/components/layout/NoteListPanel";

export default function NotesLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<div className="flex sm:flex-row flex-col justify-center h-full">
			<NoteListPanel></NoteListPanel>
			<div className="flex min-h-[300px] h-full justify-center max-w-[1000px] sm:mt-5 rounded-lg">
				{children}
			</div>
		</div >
	)
}
