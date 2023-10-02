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
                    <SubTitle>우리는 공간과 일상을 경험하는 방식을 새롭게 정의합니다.<br />모두의 라이프스타일에 영감을 줄 수 있도록 끊임없이 기술을 혁신하고, 모두가 자신의 공간, 나아가 삶을 사랑하게 만드는 유례없는 도전을 하고 있습니다.</SubTitle>
                    <IntroduceDetailContainer>
                        <IntroduceDetail>
                            <IntroductionCompanyDetailContainer>
                                <ContentImage src={IntroContentsPNG} />
                                <DetailTitleContainer>
                                    <Title>공간을 꾸미는 유저들의 사례가<br />가득한 콘텐츠</Title>
                                    <SubTitle>온라인 집들이와 인테리어 노하우 등 다양한 인테리어 콘텐츠들을<br />제공하여 누구나 쉽게 재미있게 공간을 변화시킬 수 있도록 돕습니다.</SubTitle>
                                </DetailTitleContainer>
                            </IntroductionCompanyDetailContainer>
                            <LineBottom />
                        </IntroduceDetail>
                    </IntroduceDetailContainer>
                </IntroduceCompany>
            </IntroduceCompanyContainer>
        </>
    );
};

export default 회사소개;

const IntroduceCompanyContainer = styled.div({
    paddingTop: "150px",
    ...Tablet({
        padding: "100px 65px",
    }),
    ...Mobile({
        padding: "80px 20px"
    }),
})

const IntroduceCompany = styled.div({
    maxWidth: "1400px",
    margin: "0px 135px"
})

const IntroductionCompanyDetailContainer = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "100px 0",
    ...Tablet({
        display: "grid",
        justifyContent: "center",
    }),
    ...Mobile({
        display: "grid",
        justifyContent: "center",
        padding: "80px 0",
    }),
})

const IntroduceDetailContainer = styled.div({
    ...Tablet({
        padding: "0 20px",
    }),
})

const IntroduceDetail = styled.div({
    maxWidth: "1400px",
    margin: "auto",
})

const DetailTitleContainer = styled.div({
    ...Mobile({
        padding: "0",
    }),
})

const LineBottom = styled.div({
    width: "100%",
    border: "1px solid #E1E4E6",
})

const ContentImage = styled.img({
    backgroundColor: "pink",
    width: "460px",
    height: "320px",
    ...Tablet({
        width: "auto",
        height: "570px",
    }),
    ...Mobile({
        width: "auto",
        height: "370px",
    }),
})

const Title = styled.div({
    color: Color.Gray80,
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "44px",
    display: "inlineBlock",
    marginRight: "10px",
    ...Tablet({
        fontSize: "28px",
        lineHeight: "38px",
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
    width: "497px",
    ...Mobile({
        width: "300px",
        fontSize: "14px",
        lineHeight: "22px",
    }),
})
