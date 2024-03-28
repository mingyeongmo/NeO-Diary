import { auth } from "firebase";

const Home = () => {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <div>
      이곳은 로그인 완료시 들어와지는 공간 입니다.
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Home;
