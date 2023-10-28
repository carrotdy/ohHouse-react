import { MouseEventHandler } from "react";
import { mergeClassNames } from "./Common";

type ButtonStyle = {
	[key: string]: string | number | undefined;
};

type ButtonProps = {
	text: string | React.ReactNode;
	type: "primary" | "normal" | "danger";
	size: "small" | "medium" | "large";
	width?: number | string;
	outline?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
	hover?: boolean;
	onClick: MouseEventHandler;
	margin?: string;
	style?: ButtonStyle;
};

const Button: React.FC<ButtonProps> = (props) => {
	const className = mergeClassNames([
		"button",
		props.type,
		props.size,
		props.outline ? "outline" : "",
		props.disabled ? "disabled" : "",
		props.hover ? "hover" : "",
	]);

	let isInProgress = false;

	const buttonStyle = {
		width: props.width,
		minWidth: props.width,
		margin: props.margin,
		...props.style,
	};

	return (
		<div
			className={className}
			style={buttonStyle}
			onClick={(e) => {
				if (!props.disabled) {
					if (!isInProgress) {
						isInProgress = true;
						props.onClick(e);
						isInProgress = false;
					}
				} else {
					e.stopPropagation();
				}
			}}
		>
			<div style={{ alignItems: "center" }}>{props.text}</div>
		</div>
	);
};

export default Button;
