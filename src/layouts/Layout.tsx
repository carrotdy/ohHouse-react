import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Color } from "../constants/style/Color";
import { Mobile, Tablet } from "../utils/CssUtil";

interface IProps {
  children: ReactNode;
}

export const Layout: FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <Navbar />
      {props.children}
      <BorderTopLineGray30 />
      <Footer />
    </>
  );
};

const BorderTopLineGray30 = styled.div`
  border-top: 1px solid ${Color.Gray30};
  max-width: 1400px;
  margin: auto;
  
  ${Tablet({
    maxWidth: "1150px",
  })}
  ${Mobile({
    maxWidth: "768px",
  })}
`;
