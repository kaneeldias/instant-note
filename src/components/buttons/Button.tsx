'use client';

import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const colorVariants = {
	"yellow": "bg-yellow-400",
	"red": "bg-red-500 text-white",
	"green": "bg-green-500 text-white",
}

function ActionButton({ children, colorVariant = "yellow", ...rest }: ButtonProps & { colorVariant?: string }) {

	const style = `
		${colorVariants[colorVariant as keyof typeof colorVariants]}
		hover:bg-white
		hover:cursor-pointer
		transition-all
		text-primary
		p-3 pl-5 pr-5
		rounded-md
		font-bold
		duration-300
		shadow-lg
		flex
		flex-row
		items-center
		space-x-2
		hover:text-slate-700
		disabled:opacity-50
		disabled:hover:cursor-auto
		disabled:hover:bg-yellow-400
		`;

	return (
		<button {...rest} className={style}>
			{children}
		</button>
	)
}

export default ActionButton