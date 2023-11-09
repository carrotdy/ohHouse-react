import { FileAddOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import Button from "../components/Button";
import {
	BorderBottomLineGray80,
	Container,
	SubTitle,
	Title,
} from "../components/Common";
import { JobPostingModel } from "../constants/model/JobPostingModel";
import { Color } from "../constants/style/Color";
import { Mobile } from "../utils/CssUtil";

const CareersDetail: React.FunctionComponent = () => {
  const career = useLocation().state as JobPostingModel.IJobPostingModel;
  const day = dayjs(career.date).diff(dayjs(), "day");
  const user = getAuth().currentUser;

  const navigate = useNavigate();

  const fileDownLoad = async (fileName: string) => {
    const storage = getStorage();
    const starsRef = ref(storage, `images/job-posting/${fileName}`);

    getDownloadURL(starsRef)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function () {
          const blob = xhr.response;
          const link = window.document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${fileName}`;
          link.click();
          URL.revokeObjectURL(link.href);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <Container>
      <Title style={{ marginTop: 30 }}>{career.title}</Title>
      <SubTitleContainer>
        <Date>
          D{day < 0 ? "" : "+"}
          {day}
        </Date>
        <SubTitle style={{ margin: 0 }}>
          ~{dayjs(career.date).format("YYYY.MM.DD")}
        </SubTitle>
      </SubTitleContainer>
      <DepartmentTagsContainer>
        {career.department.map((depart: string, index: number) => {
          return (
            <Tag key={`${career.postId} + ${index}`} color="geekblue">
              {depart}
            </Tag>
          );
        })}
        {user?.uid === career.userUid && (
          <Button
            text={`수정`}
            type={`default`}
            onClick={() => {
              navigate(RoutePath.CareersEdit.path, {
                state: { ...career },
              });
            }}
          />
        )}
      </DepartmentTagsContainer>
      <BorderBottomLineGray80 />
      <Content
        dangerouslySetInnerHTML={{
          __html: career.content,
        }}
        style={{ margin: "30px 0", minHeight: "300px" }}
      />
      {career.fileNames && career.fileNames.length > 0 && (
        <AttachmentsContainer>
          <AttachmentTitle>* 첨부파일</AttachmentTitle>
          {career.fileNames.map((fileName, index) => (
            <Button
              key={index}
              download
              type={"default"}
              icon={<FileAddOutlined />}
              text={fileName}
              onClick={() => fileDownLoad(fileName)}
              style={{ marginBottom: "6px" }}
            />
          ))}
        </AttachmentsContainer>
      )}
    </Container>
  );
};

const SubTitleContainer = styled.div`
  display: flex;
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

const DepartmentTagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  min-height: 300px;
  margin: 30px 0;
`;

const AttachmentsContainer = styled.div`
  display: inline-grid;
  margin-top: 20px;
`;

const AttachmentTitle = styled.p`
  color: ${Color.Gray80};
  font-size: 14px;
  margin-top: 0;
`;

export default CareersDetail;
