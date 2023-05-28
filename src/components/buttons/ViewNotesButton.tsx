import React from 'react'
import { EyeIcon } from '@heroicons/react/24/solid'
import ActionButton from "./Button"

function ViewNotesButton() {
	return (
		<ActionButton>
			<EyeIcon className="h- w-6"></EyeIcon>
			<span>VIEW NOTES</span>
		</ActionButton>
	)
}

export default ViewNotesButton