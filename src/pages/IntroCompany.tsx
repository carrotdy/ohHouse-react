import React from "react";
import { Container } from "../components/Common";
import EmployeeVoices from "./EmployeeVoices";
import IntroCompanyDetail from "./IntroCompanyDetail";

const IntroCompany: React.FunctionComponent = () => {
  return (
    <Container>
      <IntroCompanyDetail />
      <EmployeeVoices />
    </Container>
  );
};

export default IntroCompany;
