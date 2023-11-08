import { Tag } from "antd";
import dayjs from "dayjs";
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
import { Color } from "../constants/style/Color";
import { db } from "../firebase";
import { JobPostingModel } from "../model/JobPostingModel";
import { Mobile } from "../utils/CssUtil";
import { getAuth } from "firebase/auth";

const 채용: React.FunctionComponent = () => {
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
    <Container style={{ paddingBottom: "30px" }}>
      <Title>채용공고</Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <SubTitle style={{ marginBottom: "10px" }}>
          모두의 삶을 함께 바꿔나갈 기회,
          <br />
          당신의 도전이 새로운 미래를 만듭니다.
        </SubTitle>
        {user && (
          <Button
            text={`작성`}
            type={"normal"}
            size={"small"}
            width={24}
            onClick={() => {
              navigate(RoutePath.채용작성.path);
            }}
            style={{ height: "12px", alignSelf: "end" }}
          />
        )}
      </div>
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
              <div key={item.postId}>
                <JobPostingContainer>
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
        </>
      )}
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

const LoadingBar = styled.div({
  textAlign: "center",
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export default 채용;
