import { useLocation } from "react-router-dom";
import {
  BorderBottomLineGray30,
  BorderBottomLineGray80,
  Container,
  SubTitle,
  Title,
} from "../components/Common";
import styled from "styled-components";
import dayjs from "dayjs";
import { Color } from "../statics/Color";
import { Mobile } from "../utils/CssUtil";

const 채용_상세: React.FunctionComponent = () => {
  const location = useLocation().state;
  const day = dayjs(location.date).diff(dayjs(), "day");

  return (
    <Container>
      <Title style={{ marginTop: 30 }}>{location.title}</Title>
      <SubTitleContainer>
        <Date>
          D{day < 0 ? "" : "+"}
          {day}
        </Date>
        <SubTitle style={{ margin: 0 }}>
          ~{location.date} | {location.department}
        </SubTitle>
      </SubTitleContainer>
      <BorderBottomLineGray80 />
      <div
        dangerouslySetInnerHTML={{
          __html: location.content,
        }}
        style={{ margin: "30px 0" }}
      />
      <BorderBottomLineGray30 />
    </Container>
  );
};

const SubTitleContainer = styled.div({
  display: "flex",
  margin: "5px 0 30px 0",
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
