import { useMemo } from "react";
import { BorderBottomLineGray30, Container, Title } from "../components/Common";
import { EmploymentModel } from "../model/EmploymentModel";
import TeamCultureData from "../constants/data/TeamCultureData";
import 팀문화_직원의소리 from "./팀문화_직원의소리";

const 팀문화: React.FunctionComponent = () => {
  const data: Array<EmploymentModel.IEmploymentModel> = useMemo(() => {
    return TeamCultureData;
  }, []);

  return (
    <Container>
      <팀문화_직원의소리 />
      <Title
        data-aos="fade-up"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        더 나은 오늘을 만들어 가는 당신을
        <br />
        아낌없이 지원합니다
      </Title>
      <div data-aos="fade-up" className="team-culture-content-container">
        {data.map((data, i) => {
          return (
            <div key={i}>
              <h1>{data.id}</h1>
              <h2 data-aos="fade-up">{data.title}</h2>
              <div
                className="team-culture-content"
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
                data-aos="fade-up"
              />
            </div>
          );
        })}
      </div>
      <BorderBottomLineGray30 />
    </Container>
  );
};

export default 팀문화;
