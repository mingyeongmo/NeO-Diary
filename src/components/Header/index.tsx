import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  const LogOut = async () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <HeaderContainer>
      <button onClick={LogOut}>로그 아웃</button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  background: #a97bf5;
  /* border: 1px solid black; */
`;

export default Header;
