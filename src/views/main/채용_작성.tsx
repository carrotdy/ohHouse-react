import { FileAddOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { RoutePath } from "../RoutePath";
import { Container, Title } from "../components/Common";
import { DepartmentType } from "../constants/data/DepartmentType";
import { QuillEditor } from "../editor/QuillEditor";
import { db } from "../firebase";
import { isLoadingRecoil } from "../hooks/AuthRecoil";
import { DepartModel } from "../model/DepartmentModel";
import { JobPostingModel } from "../model/JobPostingModel";

const 채용_작성 = () => {
  const data: Array<DepartModel.IDepartment> = useMemo(() => {
    return DepartmentType;
  }, []);

  const user = getAuth().currentUser;
  const { Option } = Select;
  const [form] = Form.useForm();

  const [content, setContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingRecoil);

  const normFile = (e: any) => {
    const fileData: Blob | Uint8Array | ArrayBuffer = e.file.originFileObj as
      | Blob
      | Uint8Array
      | ArrayBuffer;
    const storage = getStorage();
    const imagesRef = ref(storage, `images/job-posting/${e.file.name}`);
    setFileName(e.file.name);

    const metadata = {
      contentType: e.file.type,
    };

    uploadBytes(imagesRef, fileData, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(() => {});
    });
  };

  const handleContent = (htmlContent: string) => {
    setContent(htmlContent);
  };

  const onSubmit = async () => {
    Modal.confirm({
      title: "채용공고를 작성하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        form
          .validateFields()
          .then(async (data: JobPostingModel.IJobPostingModel) => {
            await addDoc(collection(db, "job-posting"), {
              title: data.title,
              date: dayjs(data.date).format("YYYY-MM-DD HH:mm:ss"),
              content: data.content,
              isClose: false,
              fileName: fileName || null,
              department: data.department,
              uuid: user?.uid,
            });
            window.location.href = RoutePath.채용.path;
          })
          .catch((error) => {
            console.log("error", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      onCancel: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <Container>
      <Title style={{ marginBottom: "20px" }}>채용공고 작성</Title>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="채용부서"
          name={"department"}
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "채용부서를 선택해주세요",
            },
          ]}
        >
          <Select mode="multiple" style={{ width: 200 }}>
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
          name="fileName"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: false,
              message: "첨부파일을 첨부하세요",
            },
          ]}
          style={{ marginTop: "80px" }}
        >
          <Upload
            beforeUpload={(file) => {
              const maxSizeInBytes = 10 * 1024 * 1024;
              if (file.size > maxSizeInBytes) {
                Modal.confirm({
                  title: "파일 크기는 최대 10MB까지 업로드 가능합니다.",
                  okText: "확인",
                });
                return false;
              }
              return true;
            }}
            name="fileName"
            maxCount={1}
            multiple={false}
          >
            <Button loading={isLoading} icon={<FileAddOutlined />}>
              파일 업로드
            </Button>
          </Upload>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button
            htmlType="submit"
            style={{
              marginBottom: "40px",
              marginTop: "20px",
              width: "100px",
              height: "40px",
            }}
          >
            작성
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default 채용_작성;
