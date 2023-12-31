import { FileAddOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import { Container, Title } from "../components/Common";
import { QuillEditor } from "../components/QuillEditor";
import { DepartmentType } from "../constants/data/DepartmentType";
import { DepartModel } from "../constants/model/DepartmentModel";
import { JobPostingModel } from "../constants/model/JobPostingModel";
import { db } from "../firebase";
import Button from "../components/Button";
import { Color } from "../constants/style/Color";

const CareersEdit = () => {
  const career = useLocation().state as JobPostingModel.IJobPostingModel;
  const data: Array<DepartModel.IDepartment> = useMemo(() => {
    return DepartmentType;
  }, []);

  const navigate = useNavigate();

  const CollectionRef = doc(db, "job-posting", career.postId);
  const user = getAuth().currentUser;

  const { Option } = Select;
  const [form] = Form.useForm();

  const [content, setContent] = useState<string>(career.content);
  const [posting, setPosting] =
    useState<JobPostingModel.IJobPostingModel>(career);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //파일 업로드 처리
  const normFile = (e: UploadChangeParam) => {
    const storage = getStorage();
    const metadata = {
      contentType: e.file.type,
    };

    const newFileNames = [...posting.fileNames];

    e.fileList.forEach((fileItem: UploadFile) => {
      const fileData = fileItem.originFileObj as File | Blob;
      const imagesRef = ref(storage, `images/job-posting/${fileItem.name}`);

      if (!newFileNames.includes(fileItem.name)) {
        newFileNames.push(fileItem.name); // 중복 파일이 아닐 경우 목록에 추가

        uploadBytes(imagesRef, fileData, metadata).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(() => {});
        });
      }
    });

    setPosting((prevPosting) => ({
      ...prevPosting,
      fileNames: newFileNames,
    }));
  };

  const handleContent = (htmlContent: string) => {
    setContent(htmlContent);
  };

  //개별파일 삭제
  const handleDeleteJobPosting = (fileName: string) => {
    Modal.confirm({
      title: "파일을 삭제하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        const updatedFileNames = posting.fileNames.filter(
          (name) => name !== fileName
        );

        setPosting((prevPosting) => ({
          ...prevPosting,
          fileNames: updatedFileNames,
        }));
      },
    });
  };

  //채용공고 수정
  const onSubmit = async () => {
    Modal.confirm({
      title: "채용공고를 수정하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        setIsLoading(true);
        try {
          const values = await form.validateFields();

          const updateRef = CollectionRef;
          const updatedData = {
            ...values,
            userUid: user?.uid,
            date: dayjs(values.date).format("YYYY-MM-DD HH:mm:ss"),
            content,
            isClose: false,
            fileNames: posting.fileNames,
          };

          updateDoc(updateRef, updatedData).then(() => {
            setIsLoading(false);
            navigate(RoutePath.Careers.path);
          });
        } catch (error) {
          setIsLoading(false);
          console.error("validation error:", error);
        }
      },
      onCancel: () => {
        setIsLoading(false);
      },
    });
  };

  //채용공고 삭제
  const deleteJobPosting = () => {
    Modal.confirm({
      title: "채용공고를 삭제하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        await deleteDoc(CollectionRef);
        navigate(RoutePath.Careers.path);
      },
    });
  };

  return (
    <Container>
      <Title style={{ marginBottom: "20px" }}>채용공고 수정</Title>
      {career && (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="채용부서"
            name={"department"}
            initialValue={career.department.map((d) => d)}
            style={{ textAlign: "left" }}
            rules={[
              {
                required: true,
                message: "채용부서를 선택해주세요",
              },
            ]}
          >
            <Select mode="multiple" style={{ width: "50%" }}>
              {data.map((data) => {
                return (
                  <Option key={data.id} value={data.department}>
                    {data.department}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="제목"
            name={"title"}
            initialValue={career.title}
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요",
              },
            ]}
          >
            <Input placeholder="제목을 입력해주세요" />
          </Form.Item>
          <Form.Item
            label="마감일"
            name={"date"}
            initialValue={dayjs(career.date)}
            rules={[
              {
                required: true,
                message: "마감일을 선택해주세요",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="내용"
            name="content"
            initialValue={career.content}
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요",
              },
            ]}
          >
            <QuillEditor value={content} onChange={handleContent} />
          </Form.Item>
          <Form.Item
            label={"첨부파일"}
            name="fileNames"
            valuePropName="fileList"
            style={{ marginTop: "80px" }}
          >
            <p style={{ color: "red", fontSize: "12px", marginTop: 0 }}>
              (파일은 최대 5개까지 첨부 가능)
            </p>
            <Upload
              onChange={normFile}
              beforeUpload={(file) => {
                const maxSize = 10 * 1024 * 1024; //10mb
                if (file.size > maxSize) {
                  Modal.confirm({
                    title: "파일 크기는 최대 10MB까지 업로드 가능합니다.",
                    okText: "확인",
                  });
                  return false;
                }
                return true;
              }}
              maxCount={5}
              multiple={true}
              showUploadList={{
                showRemoveIcon: false,
              }}
            >
              <Button
                loading={isLoading}
                text="파일 업로드"
                type={"default"}
                icon={<FileAddOutlined />}
                style={{ borderColor: Color.Gray60 }}
              />
            </Upload>
          </Form.Item>
          {posting.fileNames && (
            <div>
              {posting.fileNames.map((name, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>{name || ""}</p>
                    <Button
                      key={index}
                      type="default"
                      text="삭제"
                      style={{
                        marginBottom: "7px",
                      }}
                      onClick={() => handleDeleteJobPosting(name)}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              text="삭제"
              type="default"
              onClick={deleteJobPosting}
              style={{
                marginBottom: "40px",
                marginTop: "20px",
                width: "100px",
                height: "40px",
              }}
            />
            <Button
              type="default"
              htmlType="submit"
              text="수정"
              style={{
                marginBottom: "40px",
                marginTop: "20px",
                width: "100px",
                height: "40px",
                marginLeft: "10px",
              }}
            />
          </div>
        </Form>
      )}
    </Container>
  );
};

export default CareersEdit;
