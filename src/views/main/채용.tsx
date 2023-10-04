import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { BorderBottomLineGray30, BorderBottomLineGray80, Container, SubTitle, Title } from '../components/Common';
import { db } from "../firebase";
import { JobPostingModel } from '../model/JobPostingModel';

const 채용 = () => {
    const [career, setCareer] = useState<Array<JobPostingModel.IJobPostingModel>>([]);
    const CollectionRef = collection(db, "job-posting");

    const getJobPosting = async () => {
        const PostingOrderBy = query(CollectionRef, orderBy("date", "desc"));
        const data = await getDocs(PostingOrderBy);

        setCareer(
            data.docs.map(
                (doc) =>
                ({
                    ...doc.data(),
                    id: doc.id,
                } as JobPostingModel.IJobPostingModel),
            ),
        );
    };

    useEffect(() => {
        getJobPosting()
    }, [])

    return (
        <Container style={{ paddingBottom: "80px" }}>
            <Title>채용공고</Title>
            <SubTitle style={{ marginBottom: "80px" }}>모두의 삶을 함께 바꿔나갈 기회,<br />당신의 도전이 새로운 미래를 만듭니다.</SubTitle>
            <BorderBottomLineGray80 style={{ borderWidth: "2px" }} />
            {career.map((item) => {
                return (
                    <div key={item.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0" }}>
                            <div key={item.id} className="job-posting-detail">
                                <Title>{item.title}</Title>
                                <SubTitle>{item.date} | {item.department}</SubTitle>
                            </div>
                            <Button
                                text={item.isClose ? `채용마감` : `채용중`}
                                type={"primary"}
                                size={"large"}
                                width={80}
                                disabled={item.isClose}
                                onClick={() => {

                                }}
                            />
                        </div>
                        <BorderBottomLineGray30 />
                    </div>
                )
            })}

        </Container>
    );
};

export default 채용;