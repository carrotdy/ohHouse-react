import styled from "styled-components";
import { BorderBottomLineGray30, SubTitle, Title } from "../components/Common";
import { IntroduceCompany } from "../constants/data/IntroduceCompany";
import { Mobile, Tablet } from "../utils/CssUtil";

const IntroCompanyDetail = () => {
  return (
    <>
      <Title data-aos="fade-up">오늘의 발견,일상의 변화</Title>
      <SubTitle data-aos="fade-up">
        우리는 공간과 일상을 경험하는 방식을 새롭게 정의합니다.
        <br />
        모두의 라이프스타일에 영감을 줄 수 있도록 끊임없이 기술을 혁신하고,
        <br />
        모두가 자신의 공간, 나아가 삶을 사랑하게 만드는 유례없는 도전을 하고
        있습니다.
      </SubTitle>
      {IntroduceCompany.map((item, index) => {
        return (
          <div
            key={`${item.index} + ${index}`}
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <CustomStyledContainer style={{ whiteSpace: "pre-line" }}>
              <ContentImage src={item.image} />
              <DetailTitleContainer>
                <Title>{item.title}</Title>
                <SubTitle>{item.description}</SubTitle>
              </DetailTitleContainer>
            </CustomStyledContainer>
            {IntroduceCompany.length - 1 !== index && (
              <BorderBottomLineGray30 />
            )}
          </div>
        );
      })}
    </>
  );
};

const CustomStyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  ${Tablet({
    display: "grid",
    padding: "60px 0",
  })}
  ${Mobile({
    display: "grid",
    padding: "30px 0",
  })}
`;

const DetailTitleContainer = styled.div``;

const ContentImage = styled.img`
  width: 460px;
  height: 320px;
  margin-right: 60px;
  ${Tablet({
    width: "520px",
    height: "360px",
    marginRight: 0,
  })}
  ${Mobile({
    width: "350px",
    height: "243px",
    marginRight: 0,
  })}
`;

export default IntroCompanyDetail;
