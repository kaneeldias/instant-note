export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export default function TextArea(props: TextAreaProps): React.ReactElement<TextAreaProps> {

	const { children, ...rest } = props;

	if (props.placeholder == "" && props.name != "") {
		props.placeholder = props.name;
	}

	return (
		<div className="flex flex-col items-center w-full h-full">
			<div className={`flex flex-col items-start w-full h-full`}>
				<textarea className="
					bg-transparent
					transition-all
					duration-0
					p-3
					text-slate-700
					focus:outline-none
					rounded-lg
					w-full
					text-xl
					h-full"
					{...rest}>
				</textarea>
			</div>
		</div >
	)
}
