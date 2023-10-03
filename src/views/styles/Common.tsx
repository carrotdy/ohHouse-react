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

const BorderBottomLine = styled.div({
    width: "100%",
    borderBottom: `1px solid ${Color.Gray30}`,
})

export {
    Container,
    BorderBottomLine
};
