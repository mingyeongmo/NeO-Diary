import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Month from "components/Month/Month";

const Home = () => {
  const navigate = useNavigate();

  const LogOut = async () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <div>
      <button onClick={LogOut}>Log Out</button>
      <h1>나의 일기</h1>
      <Link to="/diary/write">일기 쓰러가기</Link>
      <h1>2024</h1>
      <Month />
    </div>
  );
};

export default Home;
