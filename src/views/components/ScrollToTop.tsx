import { useEffect, useState } from "react";
import styled from "styled-components";
import { Color } from "../constants/style/Color";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <ScrollToTopButton onClick={toggleVisibility}>∧</ScrollToTopButton>
      )}
    </>
  );
};

const ScrollToTopButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${Color.MainClolor};
  color: ${Color.Gray10};
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  z-index: 10;

  &:hover {
    background-color: ${Color.Orange};
  }
`;

export default ScrollToTop;
