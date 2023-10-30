import { FunctionComponent, ReactNode } from "react";
import Navbar from "../common/Navbar";
import { Footer } from "../common/Footer";
import ScrollToTop from "../components/ScrollToTop";

interface IProps {
  children: ReactNode;
}

export const Layout: FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <Navbar />
      {props.children}
      <ScrollToTop />
      <Footer />
    </>
  );
};
