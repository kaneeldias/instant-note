export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function TextField(props: TextFieldProps): React.ReactElement<TextFieldProps> {

	const { children, ...rest } = props;

	if (props.placeholder == "" && props.name != "") {
		props.placeholder = props.name;
	}

	return (
		<div className="flex flex-col items-center w-full">
			<div className={`flex flex-col items-start w-full`}>
				<input className="
					bg-transparent
					border-b-2
					border-slate-500
					p-3
					text-slate-700
					focus:border-b-3
					w-full
					text-2xl
					text-bold
					focus:outline-none
					outline:none"
					{...rest} />
			</div>
		</div >
	)
}
