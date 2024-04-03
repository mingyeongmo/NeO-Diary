import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import styles from "./style.module.scss";

const Home = () => {
  const logOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <h1>나의 일기</h1>
      <Link to="/diary">일기 쓰러가기</Link>
    </div>
  );
};

export default Home;
