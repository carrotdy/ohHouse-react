import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Color } from "../constants/style/Color";
import { Mobile, Tablet } from "../utils/CssUtil";

export const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 150px 100px 0 100px;

  ${Tablet({
    maxWidth: "1150px",
    padding: "100px 45px 0 45px",
  })}
  ${Mobile({
    maxWidth: " 768px",
    padding: "80px 20px 0 20px",
  })}
`;

export const BorderBottomLineGray30 = styled.div`
  border-bottom: 1px solid ${Color.Gray30};
  width: 100%;
`;

export const BorderBottomLineGray80 = styled.div`
  border-bottom: 1px solid ${Color.Gray80};
  width: 100%;
`;

export const Title = styled.div`
  color: ${Color.Gray80};
  font-size: 28px;
  font-weight: 700;
  line-height: 40px;
  display: inline-block;
  margin-right: 10px;

  ${Tablet({
    lineHeight: "38px",
    marginTop: "30px",
  })}
  ${Mobile({
    fontSize: "20px",
    lineHeight: "26px",
  })}
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  margin: 20px 0;

  ${Mobile({
    fontSize: "10px",
    lineHeight: "18px",
  })}
`;

export const ThinLine = styled.div`
  background-color: ${Color.Gray50};
  width: 100%;
  height: 1px;
  margin-top: 30px;
`;

export const ThickLine = styled.div`
  background-color: ${Color.Gray30};
  height: 20px;
  margin-bottom: 20px;
`;

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
