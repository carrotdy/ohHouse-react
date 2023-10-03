
import { FunctionComponent, ReactNode } from "react";
import Navbar from "../common/Navbar";
import { Footer } from "../common/Footer";

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
