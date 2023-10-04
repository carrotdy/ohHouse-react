import styled from "styled-components";
import {
    Mobile,
    Tablet
} from "../utils/CssUtil";
import { Color } from "../statics/Color";

const Container = styled.div({
    padding: "150px 100px 0 100px",
    ...Tablet({
        padding: "100px 65px 0 65px",
    }),
    ...Mobile({
        padding: "80px 20px 0 20px",
    }),
})

const BorderBottomLineGray30 = styled.div({
    borderBottom: `1px solid ${Color.Gray30}`,
    width: "100%",
})

const BorderBottomLineGray80 = styled.div({
    borderBottom: `1px solid ${Color.Gray80}`,
    width: "100%",
})

const Title = styled.div({
    color: Color.Gray80,
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "40px",
    display: "inlineBlock",
    marginRight: "10px",
    ...Tablet({
        lineHeight: "38px",
        marginTop: "30px",
    }),
    ...Mobile({
        fontSize: "20px",
        lineHeight: "26px",
    }),
})

const SubTitle = styled.div({
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "26px",
    margin: "20px 0",
    ...Mobile({
        fontSize: "12px",
        lineHeight: "20px",
    }),
})

export const mergeClassNames = (preClassNames: (string | undefined)[]): string => {
    const className = preClassNames.filter((c) => c !== undefined && c !== "").join(" ").trim();

    return className;
}

export {
    Container,
    BorderBottomLineGray30,
    BorderBottomLineGray80,
    Title,
    SubTitle,
};