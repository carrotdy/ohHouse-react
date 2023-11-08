import { FunctionComponent, ReactNode } from "react";
import { Footer } from "../common/Footer";
import Navbar from "../common/Navbar";

interface IProps {
  children: ReactNode;
}

export const Layout: FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};
