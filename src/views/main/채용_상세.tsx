import { FileAddOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  BorderBottomLineGray80,
  Container,
  SubTitle,
  Title,
} from "../components/Common";
import { Color } from "../constants/style/Color";
import { Mobile } from "../utils/CssUtil";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { JobPostingModel } from "../model/JobPostingModel";

const 채용_상세: React.FunctionComponent = () => {
  const career = useLocation().state as JobPostingModel.IJobPostingModel;
  const day = dayjs(career.date).diff(dayjs(), "day");

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
      {Object.values(career.department).map((depart: string, index: number) => {
        return (
          <Tag
            key={career.uuid}
            className="post-department"
            color="geekblue"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            {depart}
          </Tag>
        );
      })}
      <BorderBottomLineGray80 />
      <div
        dangerouslySetInnerHTML={{
          __html: career.content,
        }}
        style={{ margin: "30px 0", minHeight: "300px" }}
      />
      {career.fileName && (
        <Button
          download
          icon={<FileAddOutlined />}
          onClick={() => {
            if (career.fileName) {
              fileDownLoad(career.fileName);
            }
          }}
          style={{ marginBottom: "20px" }}
        >
          {career.fileName}
        </Button>
      )}
    </Container>
  );
};

const SubTitleContainer = styled.div({
  display: "flex",
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

export default 채용_상세;
