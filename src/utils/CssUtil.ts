export interface ICssProps {
	[index: string]: string | number | { [index: string]: string | number };
}

const Media = (maxWidthSize: number, property: ICssProps) => {
	const mediaQuery = `@media(max-width: ${maxWidthSize}px)`;

	const result: any = {
	};
	result[mediaQuery] = {
		...property,
	};
	return result;
};
const Mobile = (property: ICssProps) => Media(768, property);
const Tablet = (property: ICssProps) => Media(1150, property);

export {
	Media,
	Mobile,
	Tablet
}