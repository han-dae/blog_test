import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

// 버튼의 스타일
const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-right: 0;
  color: ${({ theme }) => theme.text};
  border-radius: 30px 0 0 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
  width: 5rem;
  height: 3rem;
  float: right;

  div {
    height: auto;
    width: auto;
    transition: all 0.5s linear;
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      <b>{theme === "light" ? <div>DARK</div> : <div>LIGHT</div>}</b>
    </Button>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggletheme: func.isRequired,
};

export default Toggle;
