import { Tag } from "antd";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { isEmpty } from "lodash-es";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import {
	BorderBottomLineGray30,
	BorderBottomLineGray80,
	Container,
	SubTitle,
	Title,
} from "../components/Common";
import { JobPostingModel } from "../constants/model/JobPostingModel";
import { Color } from "../constants/style/Color";
import { db } from "../firebase";
import { Mobile } from "../utils/CssUtil";

const Careers: React.FunctionComponent = () => {
  const [career, setCareer] = useState<Array<JobPostingModel.IJobPostingModel>>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const CollectionRef = collection(db, "job-posting");

  const user = getAuth().currentUser;

  //채용정보 가져오기
  const getJobPosting = async () => {
    setIsLoading(true);
    try {
      const PostingOrderBy = query(CollectionRef, orderBy("date", "desc"));
      const data = await getDocs(PostingOrderBy);

      const careerData = data.docs.map(
        (doc) =>
          ({
            ...doc.data(),
          } as JobPostingModel.IJobPostingModel)
      );

      setCareer(careerData);
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobPosting();
  }, []);

  return (
    <Container>
      <Title>채용공고</Title>
      <CareerSection>
        <SubTitle>
          모두의 삶을 함께 바꿔나갈 기회,
          <br />
          당신의 도전이 새로운 미래를 만듭니다.
        </SubTitle>
        {user && (
          <Button
            text={`작성`}
            type={`default`}
            onClick={() => {
              navigate(RoutePath.CareersCreate.path);
            }}
            style={{ marginBottom: "10px" }}
          />
        )}
      </CareerSection>
      <BorderBottomLineGray80 style={{ borderWidth: "2px" }} />
      {isLoading ? (
        <LoadingBar>
          <ClipLoader color={Color.Orange} />
        </LoadingBar>
      ) : isEmpty(career) ? (
        <div style={{ textAlign: "center", padding: "300px 0 255px 0" }}>
          진행중인 채용공고가 없습니다.
        </div>
      ) : (
        <>
          {career.map((item, index) => {
            const day = dayjs(item.date).diff(dayjs(), "day");

            return (
              <li key={item.postId} style={{ listStyle: "none" }}>
                <JobPostingContainer
                  onClick={() => {
                    navigate(RoutePath.CareersDetail.path, {
                      state: { ...item },
                    });
                  }}
                >
                  <TextContainer>
                    <PostingTitle>{item.title}</PostingTitle>
                    <SubTitleContainer>
                      <Date>
                        D{day < 0 ? "" : "+"}
                        {day}
                      </Date>
                      <SubTitle style={{ margin: 0 }}>
                        ~{dayjs(item.date).format("YYYY.MM.DD")}
                      </SubTitle>
                    </SubTitleContainer>
                    {item.department.map((depart: string, index: number) => {
                      return (
                        <Tag
                          key={`${item.postId} + ${index}`}
                          color="geekblue"
                          style={{ marginBottom: "8px" }}
                        >
                          {depart}
                        </Tag>
                      );
                    })}
                  </TextContainer>
                  <Button
                    text={item.isClose ? `채용마감` : `채용중`}
                    type={`primary`}
                    disabled={item.isClose}
                    onClick={() => {
                      navigate(RoutePath.CareersDetail.path, {
                        state: { ...item },
                      });
                    }}
                    style={{ width: "100px", height: "36px" }}
                  />
                </JobPostingContainer>
                {career.length - 1 !== index && <BorderBottomLineGray30 />}
              </li>
            );
          })}
        </>
      )}
    </Container>
  );
};

const CareerSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const TextContainer = styled.div`
  margin-right: 36px;
  ${Mobile({
    margin: "0",
  })}
`;

const PostingTitle = styled.h2`
  color: ${Color.Gray80};
  font-size: 26px;
  font-weight: bold;
  display: inline-block;
  line-height: 40px;
  margin: 0px;
  ${Mobile({
    fontSize: "16px",
    lineHeight: "26px",
  })}
`;

const SubTitleContainer = styled.div`
  display: flex;
`;

const JobPostingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 52px 0;
  cursor: pointer;
  ${Mobile({
    display: "grid",
    padding: "40px 0",
  })}
`;

const Date = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: ${Color.Red100};
  ${Mobile({
    fontSize: "12px",
    lineHeight: "20px",
  })}
`;

const LoadingBar = styled.div`
  text-align: center;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Careers;
