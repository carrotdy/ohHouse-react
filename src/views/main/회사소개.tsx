import React from "react";
import styled from "styled-components";
import { Color } from "../statics/Color";
import { IntroduceCompany } from "../statics/constants/IntroduceCompany";
import {
    Mobile,
    Tablet
} from "../utils/CssUtil";

const 회사소개: React.FunctionComponent = () => {

    return (
        <>
            <IntroduceCompanyContainer>
                <Title>오늘의 발견,<br />일상의 변화</Title>
                <SubTitle>우리는 공간과 일상을 경험하는 방식을 새롭게 정의합니다.<br />모두의 라이프스타일에 영감을 줄 수 있도록 끊임없이 기술을 혁신하고,<br />모두가 자신의 공간, 나아가 삶을 사랑하게 만드는 유례없는 도전을 하고 있습니다.</SubTitle>
                {IntroduceCompany.map((item) => {
                    return (
                        <div key={item.index}>
                            <IntroductionCompanyDetailContainer style={{ whiteSpace: "pre-line" }}>
                                <ContentImage src={item.image} />
                                <DetailTitleContainer>
                                    <Title>{item.title}</Title>
                                    <SubTitle>{item.description}</SubTitle>
                                </DetailTitleContainer>
                            </IntroductionCompanyDetailContainer>
                            <LineBottom />
                        </div>
                    )
                })}
            </IntroduceCompanyContainer>
        </>
    );
};

const IntroduceCompanyContainer = styled.div({
    padding: "150px 100px 0 100px",
    ...Tablet({
        padding: "100px 65px 0 65px",
    }),
    ...Mobile({
        padding: "80px 20px 0 20px",
    }),
})

const IntroductionCompanyDetailContainer = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 0",
    ...Tablet({
        display: "grid",
        padding: "60px 0",
    }),
    ...Mobile({
        display: "grid",
        padding: "30px 0",
    }),
})

const DetailTitleContainer = styled.div({})

const LineBottom = styled.div({
    width: "100%",
    border: `1px solid ${Color.Gray30}`,
})

const ContentImage = styled.img({
    width: "460px",
    height: "320px",
    marginRight: "60px",
    ...Tablet({
        width: "520px",
        height: "360px",
        marginRight: 0,
    }),
    ...Mobile({
        width: "350px",
        height: "243px",
        marginRight: 0,
    }),
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
        fontSize: "18px",
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

export default 회사소개;
