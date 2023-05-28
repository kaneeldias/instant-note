import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import ActionButton from "./Button"
import Link from "next/link"

function CreateNoteButton() {
	return (
		<Link href="/note">
			<ActionButton>
				<PlusIcon className="h- w-6"></PlusIcon>
				<span>CREATE NOTE</span>
			</ActionButton>
		</Link>
	)
}

export default CreateNoteButton