import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
    value: string;
    onChange: (content: string) => void;
}

export const QuillEditor = ({ value, onChange }: IProps) => {
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                        { size: ["small", false, "large", "huge"] },
                        { color: [] },
                    ],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                    ],
                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                    ["image"],
                ],
            },
        }),
        []
    );

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            theme="snow"
            placeholder="내용을 입력해주세요"
            style={{ height: "300px", width: "100%" }}
        />
    );
};
