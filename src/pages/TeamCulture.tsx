import { Container } from "../components/Common";
import WorkingEnvironment from "./WorkingEnvironment";
import EmployeeVoices from "./EmployeeVoices";

const TeamCulture: React.FunctionComponent = () => {
  return (
    <Container>
      <EmployeeVoices />
      <WorkingEnvironment />
    </Container>
  );
};

export default TeamCulture;