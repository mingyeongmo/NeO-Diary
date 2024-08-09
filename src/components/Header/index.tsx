import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BookIcon } from "components/Icon/Icons";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleIconClick = () => {
    window.location.href = "/";
  };

  const handleLogOut = async () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <HeaderContainer>
      <Content>
        <IconBar onClick={handleIconClick}>
          <BookIcon
            style={{
              fill: "white",
              width: "24px",
              height: "24px",
            }}
          />
          <Span>네오 일기</Span>
        </IconBar>
        <MenuBar>
          <Span>
            <Link to="/">일기 목록</Link>
          </Span>
          <Span>
            <Link to="/diary/write">일기 작성</Link>
          </Span>
          <Span>
            <Link to="/mypage">마이 페이지</Link>
          </Span>
          {isLoggedIn ? (
            <Span onClick={handleLogOut} style={{ cursor: "pointer" }}>
              로그아웃
            </Span>
          ) : (
            <Span>
              <Link to="/login">로그인</Link>
            </Span>
          )}
        </MenuBar>
      </Content>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  height: 50px;
  padding: 0 300px;
  box-sizing: border-box;
  background: #9990ff;
  flex-shrink: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBar = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const MenuBar = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  padding-left: 15px;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default Header;
