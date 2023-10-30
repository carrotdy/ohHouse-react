import { RegisterOptions, useFormContext, Controller } from "react-hook-form";
import { Color } from "../constants/style/Color";

interface InputFormProps {
  name: string;
  label?: string;
  defaultValue?: string;
  rules?: RegisterOptions; //규칙
  disabled?: boolean;
  onFocus?: () => void;
  required: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onChangeText?: (text: string) => void;
  pattern: string;
  message?: string;
  style?: React.CSSProperties;
}

const InputForm = (props: InputFormProps) => {
  const {
    name,
    label,
    defaultValue,
    rules,
    disabled,
    onFocus,
    required,
    placeholder,
    autoFocus,
    onChangeText,
    pattern,
    message,
    style,
  } = props;

  const context = useFormContext();
  const {
    formState: { errors },
  } = context;

  return (
    <div style={style}>
      {label && <label>{label}</label>}
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <div style={{ flexDirection: "row" }}>
            <input
              {...props}
              style={{
                flex: 1,
                padding: 0,
                height: 34,
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 4,
                backgroundColor: disabled ? Color.Gray20 : Color.Gray10,
                borderColor: disabled
                  ? Color.Gray30
                  : errors[name]
                  ? Color.Red100
                  : Color.Gray30,
                justifyContent: "center",
              }}
              onBlur={onBlur}
              onFocus={onFocus}
              onChange={(value) => {
                onChange(value);
                onChangeText && onChange(value);
              }}
              pattern={pattern}
              value={value}
              required={required}
              placeholder={placeholder}
              autoFocus={autoFocus}
            />
          </div>
        )}
        name={name}
        rules={rules}
        defaultValue={defaultValue || ""}
      />
      {errors[name] && (
        <p style={{ color: Color.Red100, fontSize: 12 }}>
          {message || "입력 형식이 올바르지 않습니다."}
        </p>
      )}
    </div>
  );
};

export default InputForm;
