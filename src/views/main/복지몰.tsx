import styled from "styled-components";
import { Container, SubTitle, Title } from "../components/Common";
import DummyData from "../data/DummyData";
import 복지몰_상품 from "./복지몰_상품";

const 복지몰: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>쇼핑모아 복지몰</Title>
      <SubTitle>
        쇼핑모아 모든 직원들이 복지포인트를 이용하여<br />쇼핑을 할 수 있는 공간입니다
      </SubTitle>
      <ProductCardContainer>
        {DummyData.map((data, index) => {
          return <복지몰_상품 key={data.id} data={data} index={index} />;
        })}
      </ProductCardContainer>
    </Container>
  );
};

const ProductCardContainer = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  justifyContent: "center",
});

export default 복지몰;
