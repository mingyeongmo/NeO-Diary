import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BookIcon } from "components/Icon/Icons";

const Header = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    window.location.href = "/";
  };

  const LogOut = async () => {
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
          <Span onClick={LogOut}>로그 아웃</Span>
        </MenuBar>
      </Content>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 300px;
  box-sizing: border-box;
  background: #9990ff;
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
