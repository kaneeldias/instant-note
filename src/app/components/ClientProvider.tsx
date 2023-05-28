"use client"

import React from 'react'
import { Toaster } from "react-hot-toast"

export default function ClientProvider() {
	return (
		<>
			<Toaster position="bottom-center" reverseOrder={false} />
		</>
	)
}

