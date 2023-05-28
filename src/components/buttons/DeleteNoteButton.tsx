import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import ActionButton, { ButtonProps } from "./Button"

function DeleteNoteButton(props: ButtonProps) {
	return (
		<ActionButton colorVariant="red" {...props}>
			<TrashIcon className="h-6 w-6"></TrashIcon>
		</ActionButton>
	)
}

export default DeleteNoteButton