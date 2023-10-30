import { ICssProps } from "./interface";

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

// flex box
const FlexContainer = <T>(property: T) => ({
    display: "flex",
    ...property,
});
const FlexCenterContainer = <T>(property: T) => FlexContainer({
    justifyContent: "center", alignItems: "center", ...property,
});

export {
    Media,
    Mobile,
    Tablet,
    FlexCenterContainer
}