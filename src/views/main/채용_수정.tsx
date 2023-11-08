import { FileAddOutlined } from "@ant-design/icons";
import {
	Button,
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
import { DepartmentType } from "../constants/data/DepartmentType";
import { QuillEditor } from "../editor/QuillEditor";
import { db } from "../firebase";
import { DepartModel } from "../model/DepartmentModel";
import { JobPostingModel } from "../model/JobPostingModel";

const 채용_수정 = () => {
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

    e.fileList.forEach((fileItem: UploadFile) => {
      const fileData = fileItem.originFileObj as File | Blob;
      const imagesRef = ref(storage, `images/job-posting/${fileItem.name}`);
      const file = {
        name: fileItem.name,
        file: fileData,
      };

      if (!posting.fileNames.includes(file.name)) {
        setPosting((prevPosting) => ({
          ...prevPosting,
          fileNames: [...prevPosting.fileNames, file.name],
        }));

        uploadBytes(imagesRef, fileData, metadata).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(() => {});
        });
      }
    });
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
        form
          .validateFields()
          .then(async (values) => {
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
              navigate(RoutePath.채용.path);
            });
          })
          .catch((error) => {
            setIsLoading(false);
            console.log("error", error);
          });
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
        navigate(RoutePath.채용.path);
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
            getValueFromEvent={normFile}
            style={{ marginTop: "80px" }}
          >
            <p style={{ color: "red", fontSize: "12px", marginTop: 0 }}>
              (파일은 최대 5개까지 첨부 가능)
            </p>
            <Upload
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
              <Button loading={isLoading} icon={<FileAddOutlined />}>
                파일 업로드
              </Button>
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
                    <p>{name ? name : ""}</p>
                    <Button
                      key={index}
                      danger
                      style={{
                        marginBottom: "7px",
                      }}
                      type="default"
                      onClick={() => handleDeleteJobPosting(name)}
                    >
                      삭제
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              danger
              onClick={deleteJobPosting}
              style={{
                marginBottom: "40px",
                marginTop: "20px",
                width: "100px",
                height: "40px",
              }}
            >
              삭제
            </Button>
            <Button
              htmlType="submit"
              style={{
                marginBottom: "40px",
                marginTop: "20px",
                width: "100px",
                height: "40px",
                marginLeft: "10px",
              }}
            >
              수정
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default 채용_수정;
