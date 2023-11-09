import { Button as AntdButton } from "antd";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Color } from "../constants/style/Color";

interface IButtonProps {
  text: string;
  type: "default" | "primary";
  disabled?: boolean;
  onClick?: MouseEventHandler;
  loading?: boolean;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  download?: boolean;
  danger?: boolean;
  style?: React.CSSProperties;
}

const buttonStyles = {
  default: {
    backgroundColor: Color.Gray10,
    color: Color.MainColor,
    borderColor: Color.MainColor,
  },
  primary: {
    backgroundColor: Color.MainColor,
    color: Color.Gray10,
    borderColor: Color.MainColor,
  },
  disabled: {
    backgroundColor: Color.Gray30,
    color: Color.Gray60,
    borderColor: Color.Gray30,
  },
};

const Button: React.FC<IButtonProps> = (props) => {
  const {
    text,
    type,
    disabled = false,
    onClick,
    loading = false,
    icon,
    htmlType,
    download = false,
    style,
  } = props;

  const getButtonStyle = () => {
    switch (type) {
      case "default":
        return disabled ? buttonStyles.disabled : buttonStyles.default;
      case "primary":
        return disabled ? buttonStyles.disabled : buttonStyles.primary;
      default:
        return buttonStyles.primary;
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      icon={icon}
      htmlType={htmlType}
      download={download}
      style={{
        ...buttonStyle,
        ...style,
      }}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(AntdButton)`
  &:hover {
    background-color: ${(props) =>
      props.type === "default" && !props.disabled
        ? Color.MainColor
        : ""} !important;

    color: ${(props) =>
      props.type === "default" && !props.disabled
        ? Color.Gray10
        : ""} !important;

    border-color: ${(props) =>
      props.type === "default" && !props.disabled
        ? Color.MainColor
        : ""} !important;
  }
`;

export default Button;
