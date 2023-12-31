import { FileAddOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import { Container, Title } from "../components/Common";
import { QuillEditor } from "../components/QuillEditor";
import { DepartmentType } from "../constants/data/DepartmentType";
import { DepartModel } from "../constants/model/DepartmentModel";
import { db } from "../firebase";
import Button from "../components/Button";
import { Color } from "../constants/style/Color";

const CareersCreate = () => {
  const data: Array<DepartModel.IDepartment> = useMemo(() => {
    return DepartmentType;
  }, []);

  const navigate = useNavigate();

  const user = getAuth().currentUser;
  const { Option } = Select;
  const [form] = Form.useForm();

  const [content, setContent] = useState<string>("");
  const [fileList, setFileList] = useState<
    { name: string; file: File | Blob }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //파일 업로드 처리
  const normFile = (e: UploadChangeParam) => {
    const storage = getStorage();
    const metadata = {
      contentType: e.file.type,
    };

    const newFiles = e.fileList.slice(0, 5).map((fileItem: UploadFile) => {
      const fileData = fileItem.originFileObj as File | Blob;
      const imagesRef = ref(storage, `images/job-posting/${fileItem.name}`);

      uploadBytes(imagesRef, fileData, metadata)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then(() => {});
        })
        .catch((error) => {
          console.error("error", error);
        });

      return {
        name: fileItem.name,
        file: fileData,
      };
    });

    setFileList(newFiles);
  };

  //QuillEditor
  const handleContent = (htmlContent: string) => {
    setContent(htmlContent);
  };

  const handleDeleteJobPosting = (fileName: string) => {
    Modal.confirm({
      title: "파일을 삭제하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        const updatedFileList = fileList.filter(
          (file) => file.name !== fileName
        );
        setFileList(updatedFileList);
      },
    });
  };

  //채용공고 작성
  const onSubmit = async () => {
    Modal.confirm({
      title: "채용공고를 작성하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        try {
          const values = await form.validateFields();

          const docRef = await addDoc(collection(db, "job-posting"), {
            ...values,
            userUid: user?.uid,
            date: dayjs(values.date).format("YYYY-MM-DD HH:mm:ss"),
            isClose: false,
            fileNames: fileList.map((file) => file.name),
          });

          // 고유한 postId 생성
          const postId = docRef.id;
          await updateDoc(docRef, { postId: postId });

          navigate(RoutePath.Careers.path);
        } catch (error) {
          console.log("validation error:", error);
        }
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
          name="fileNames"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{ marginTop: "80px" }}
        >
          <p style={{ color: "red", fontSize: "12px", marginTop: 0 }}>
            (파일은 최대 5개까지 첨부 가능)
          </p>
          <Upload
            onChange={normFile}
            maxCount={5}
            multiple={true}
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
          >
            <Button
              type="default"
              loading={isLoading}
              text="파일 업로드"
              icon={<FileAddOutlined />}
              style={{ borderColor: Color.Gray60 }}
            />
          </Upload>
        </Form.Item>
        {fileList && (
          <div>
            {fileList.map((file, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{file.name ? file.name : ""}</p>
                  <Button
                    key={index}
                    type="default"
                    text="삭제"
                    onClick={() => handleDeleteJobPosting(file.name)}
                    style={{
                      marginBottom: "7px",
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <Button
            htmlType="submit"
            text="작성"
            type={`default`}
            style={{
              marginBottom: "40px",
              marginTop: "20px",
              width: "100px",
              height: "40px",
            }}
          />
        </div>
      </Form>
    </Container>
  );
};

export default CareersCreate;
