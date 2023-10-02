import React from "react";
import styled from "styled-components";
import {
    Mobile,
    Tablet
} from "../utils/CssUtil";
import { Color } from "../statics/Color";
import { IntroContentsPNG } from "../images";

const 회사소개: React.FunctionComponent = () => {

    return (
        <>
            <IntroduceCompanyContainer>
                <IntroduceCompany>
                    <Title>오늘의 발견,<br />일상의 변화</Title>
                    <SubTitle>우리는 공간과 일상을 경험하는 방식을 새롭게 정의합니다.<br />모두의 라이프스타일에 영감을 줄 수 있도록 끊임없이 기술을 혁신하고,<br />모두가 자신의 공간, 나아가 삶을 사랑하게 만드는 유례없는 도전을 하고 있습니다.</SubTitle>
                    <IntroduceDetailContainer>
                        <IntroductionCompanyDetailContainer>
                            <ContentImage src={IntroContentsPNG} />
                            <DetailTitleContainer>
                                <Title>공간을 꾸미는 유저들의 사례가<br />가득한 콘텐츠</Title>
                                <SubTitle>온라인 집들이와 인테리어 노하우 등<br />다양한 인테리어 콘텐츠들을 제공하여<br />누구나 쉽게 재미있게 공간을 변화시킬 수 있도록 돕습니다.</SubTitle>
                            </DetailTitleContainer>
                        </IntroductionCompanyDetailContainer>
                        <LineBottom />
                    </IntroduceDetailContainer>
                </IntroduceCompany>
            </IntroduceCompanyContainer>
        </>
    );
};

const IntroduceCompanyContainer = styled.div({
    paddingTop: "150px",
    ...Tablet({
        padding: "100px 65px 0 65px",
    }),
    ...Mobile({
        padding: "80px 20px 0 20px",
    }),
})

const IntroduceCompany = styled.div({
    margin: "0px 135px",
    ...Tablet({
        margin: "0px",
    }),
})

const IntroductionCompanyDetailContainer = styled.div({
    display: "flex",
    alignItems: "center",
    padding: "100px 0",
    ...Tablet({
        display: "grid",
        justifyContent: "center",
        padding: "60px 0",
    }),
    ...Mobile({
        display: "grid",
        justifyContent: "center",
        padding: "30px 0",
    }),
})

const IntroduceDetailContainer = styled.div({
    ...Tablet({
        padding: "0 20px",
    }),
})

const DetailTitleContainer = styled.div({
    ...Mobile({
        placeSelf: "center",
    }),
})

const LineBottom = styled.div({
    width: "100%",
    border: `1px solid ${Color.Gray30}`,
})

const ContentImage = styled.img({
    backgroundColor: "pink",
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
