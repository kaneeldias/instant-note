import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import ActionButton from "./Button"
import Link from "next/link"

function CreateNoteButton() {
	return (
		<Link href="/">
			<ActionButton>
				<PlusIcon className="h-6 w-6 "></PlusIcon>
				<span className="hidden sm:block">CREATE NOTE</span>
			</ActionButton>
		</Link>
	)
}

export default CreateNoteButton