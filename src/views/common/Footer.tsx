import React from "react";
import styled from "styled-components";
import { Mobile, Tablet } from "../utils/CssUtil";
import { Color } from "../constants/style/Color";

export const Footer: React.FunctionComponent = () => {
  return (
    <>
      <BorderTopLineGray30 />
      <FooterContainer>
        <Title>(주)오하우스</Title>
        <Contents>대표이사: 홍다영</Contents>
        <Contents>
          주소 : 서울특별시 강남구 강남대로7 |{" "}
          <span>문의전화 : 02-000-0000 | 팩스 : 02-000-0000</span>
        </Contents>
      </FooterContainer>
    </>
  );
};

const BorderTopLineGray30 = styled.div({
  borderTop: `1px solid ${Color.Gray30}`,
  maxWidth: "1400px",
  margin: "auto",
  ...Tablet({
    maxWidth: "1150px",
  }),
  ...Mobile({
    maxWidth: "768px",
  }),
});

const FooterContainer = styled.footer({
  maxWidth: "1400px",
  margin: "auto",
  padding: "50px 100px",
  ...Tablet({
    maxWidth: "1150px",
    padding: "50px 45px",
  }),
  ...Mobile({
    maxWidth: "768px",
    padding: "30px 20px",
  }),
});

const Title = styled.div({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "12px",
  ...Mobile({
    fontSize: "16px",
    marginBottom: "10px",
  }),
});

const Contents = styled.div({
  fontSize: "15px",
  lineHeight: "22px",
  ...Mobile({
    fontSize: "12px",
    lineHeight: "18px",
  }),
});
