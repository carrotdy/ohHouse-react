import dayjs from "dayjs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
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
import { Color } from "../constants/style/Color";
import { db } from "../firebase";
import { isLoadingRecoil } from "../hooks/AuthRecoil";
import { JobPostingModel } from "../model/JobPostingModel";
import { Mobile } from "../utils/CssUtil";

const 채용: React.FunctionComponent = () => {
  const [career, setCareer] = useState<Array<JobPostingModel.IJobPostingModel>>(
    []
  );
  const setIsLoading = useSetRecoilState<boolean>(isLoadingRecoil);

  const navigate = useNavigate();

  const CollectionRef = collection(db, "job-posting");

  const getJobPosting = async () => {
    try {
      const PostingOrderBy = query(CollectionRef, orderBy("date", "desc"));
      const data = await getDocs(PostingOrderBy);

      const careerData = data.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as JobPostingModel.IJobPostingModel)
      );

      setCareer(careerData);
    } catch (error) {
      console.error("데이터 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobPosting();
  }, []);

  return (
    <Container style={{ paddingBottom: "30px" }}>
      <Title>채용공고</Title>
      <SubTitle style={{ marginBottom: "40px" }}>
        모두의 삶을 함께 바꿔나갈 기회,
        <br />
        당신의 도전이 새로운 미래를 만듭니다.
      </SubTitle>
      <BorderBottomLineGray80 style={{ borderWidth: "2px" }} />
      {career.map((item, index) => {
        const day = dayjs(item.date).diff(dayjs(), "day");

        return (
          <div key={item.id}>
            <JobPostingContainer>
              <TextContainer key={item.id}>
                <PostingTitle>{item.title}</PostingTitle>
                <SubTitleContainer>
                  <Date>
                    D{day < 0 ? "" : "+"}
                    {day}
                  </Date>
                  <SubTitle style={{ margin: 0 }}>
                    ~{item.date} | {item.department}
                  </SubTitle>
                </SubTitleContainer>
              </TextContainer>
              <Button
                text={item.isClose ? `채용마감` : `채용중`}
                type={"primary"}
                size={"medium"}
                width={80}
                disabled={item.isClose}
                onClick={() => {
                  navigate(RoutePath.채용상세.path, {
                    state: { ...item },
                  });
                }}
              />
            </JobPostingContainer>
            {career.length - 1 !== index && <BorderBottomLineGray30 />}
          </div>
        );
      })}
    </Container>
  );
};

const TextContainer = styled.div({
  marginRight: "36px",
  ...Mobile({
    marginRight: 0,
  }),
});

const PostingTitle = styled.div({
  color: Color.Gray80,
  fontSize: "26px",
  fontWeight: "bold",
  display: "inlineBlock",
  lineHeight: "40px",
  ...Mobile({
    fontSize: "16px",
    lineHeight: "26px",
  }),
});

const SubTitleContainer = styled.div({
  display: "flex",
  margin: "5px 0 14px 0",
});

const JobPostingContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "60px 0",
  ...Mobile({
    display: "grid",
    padding: "40px 0",
  }),
});

const Date = styled.div({
  fontSize: "18px",
  fontWeight: "bold",
  marginRight: "10px",
  color: Color.Red100,
  ...Mobile({
    fontSize: "12px",
    lineHeight: "20px",
  }),
});

export default 채용;
