import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // 유저 정보 확인 후 로그인 되어 있지 않으면 로그인 창으로 보내 버림.
  const user = auth.currentUser;
  console.log({ user });
  if (user === null) {
    console.log({ user });
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
