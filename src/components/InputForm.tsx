import { RegisterOptions, useFormContext, Controller } from "react-hook-form";
import { Color } from "../constants/style/Color";
import { ChangeEvent, Children, ReactNode } from "react";
import styled from "styled-components";

interface InputFormProps {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  onFocus?: () => void;
  required?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  style?: React.CSSProperties;
}

const InputForm = (props: InputFormProps) => {
  const {
    name,
    type,
    label,
    defaultValue,
    disabled,
    onFocus,
    required = false,
    placeholder,
    autoFocus,
    onChange,
    pattern,
    style,
  } = props;

  return (
    <div style={style}>
      {!!label && (
        <>
          {required ? (
            <>
              <span style={{ color: Color.Red100 }}>*</span>
              <label>{label}</label>
            </>
          ) : (
            <label>{label}</label>
          )}
        </>
      )}
      <div style={{ flexDirection: "row" }}>
        <Input
          {...props}
          type={type}
          name={name}
          onFocus={onFocus}
          onChange={(value) => {
            onChange(value);
          }}
          pattern={pattern}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

const Input = styled.input({
  width: "100%",
  padding: "8px",
  marginTop: "6px",
  border: `1px solid ${Color.Gray40}`,
  borderRadius: "4px",
});

export default InputForm;
