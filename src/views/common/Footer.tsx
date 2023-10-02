import React from "react";
import styled from "styled-components";
import {
    Mobile,
    Tablet
} from "../utils/CssUtil";

export const Footer: React.FunctionComponent = () => {

    return (
        <FooterContainer style={{}}>
            <h3>(주)마켓모아</h3>
            <section>
                <p style={{ marginBottom: "0px" }}>대표이사: 이승재</p>
                <p style={{ marginTop: "5px" }}>주소 : 서울특별시 강남구 강남대로7 | <span>문의전화 : 02-000-0000 | 팩스 : 02-000-0000</span></p>
            </section>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer({
    margin: "50px 135px",
    ...Tablet({
        margin: "50px 65px",
    }),
    ...Mobile({
        margin: "50px 20px",
    }),
})
