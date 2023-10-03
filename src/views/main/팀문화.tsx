import { useMemo } from "react";
import styled from "styled-components";
import { EmploymentModel } from "../model/EmploymentModel";
import { TeamCultureData } from "../statics/constants/TeamCultureData";
import { BorderBottomLine, Container } from "../styles/Common";
import {
    Mobile
} from "../utils/CssUtil";

const 팀문화: React.FunctionComponent = () => {
    const data: Array<EmploymentModel.IEmploymentModel> = useMemo(() => {
        return TeamCultureData;
    }, []);

    return (
        <Container>
            <Title>더 나은 오늘을 만들어 가는 당신을<br />아낌없이 지원합니다</Title>
            <div className="team-culture-content-container">
                {data.map((data, i) => {
                    return (
                        <div key={i} >
                            <h1>{data.id}</h1>
                            <h2>{data.title}</h2>
                            <div
                                className="team-culture-content"
                                dangerouslySetInnerHTML={{
                                    __html: data.content,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <BorderBottomLine />
        </Container>
    );
};

const Title = styled.div({
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "30px 0",

    ...Mobile({
        fontSize: "20px"
    }),
})



export default 팀문화;
