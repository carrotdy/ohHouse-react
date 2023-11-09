import { useMemo } from "react";
import styled from "styled-components";
import { Title } from "../components/Common";
import TeamCultureData from "../constants/data/TeamCultureData";
import { EmploymentModel } from "../constants/model/EmploymentModel";

const WorkingEnvironment = () => {
  const data: Array<EmploymentModel.IEmploymentModel> = useMemo(() => {
    return TeamCultureData;
  }, []);

  return (
    <>
      <Title
        data-aos="fade-up"
        style={{ textAlign: "center", marginBottom: "30px", display: "block" }}
      >
        더 나은 오늘을 만들어 가는 당신을
        <br />
        아낌없이 지원합니다
      </Title>
      <TeamCultureConatiner data-aos="fade-up">
        {data.map((data: EmploymentModel.IEmploymentModel, i: number) => {
          return (
            <TeamCulture key={i}>
              <TeamCultureNumber>{data.id}</TeamCultureNumber>
              <h2 data-aos="fade-up">{data.title}</h2>
              <TeamCultureContent
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
                data-aos="fade-up"
              />
            </TeamCulture>
          );
        })}
      </TeamCultureConatiner>
    </>
  );
};

const TeamCultureConatiner = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
`;

const TeamCulture = styled.div`
  width: 50%;
  margin-bottom: 50px;
  @media (max-width: 541px) {
    width: 100%;
  }
`;

const TeamCultureNumber = styled.h1`
  width: 40px;
  height: 40px;
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  line-height: 40px;
  border: 1px solid black;
  border-radius: 50px;

  &:hover {
    background: orange;
    border-color: orange;
    color: white;
    transition: 0.5s;
  }
`;

const TeamCultureContent = styled.div`
  line-height: 26px;
  font-size: 14px;
  margin: auto;
`;

export default WorkingEnvironment;
