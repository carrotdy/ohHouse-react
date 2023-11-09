import { FunctionComponent, ReactNode } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Tablet, Mobile } from "../utils/CssUtil";
import { Color } from "../constants/style/Color";

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
