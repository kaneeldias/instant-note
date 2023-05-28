import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import ActionButton, { ButtonProps } from "./Button"

function AddNoteButton(props: ButtonProps) {
	return (
		<ActionButton colorVariant="green" {...props}>
			<PlusCircleIcon className="h- w-6"></PlusCircleIcon>
		</ActionButton>
	)
}

export default AddNoteButton