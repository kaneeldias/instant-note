"use client"

import NoteListPanel from "@/components/layout/NoteListPanel";

export default function NotesLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<div className="flex flex-row justify-center h-full">
			<NoteListPanel></NoteListPanel>
			<div className="flex min-h-[300px] h-full justify-center min-w-[500px] max-w-[1000px] w-full mt-5 rounded-lg">
				{children}
			</div>
		</div >
	)
}
