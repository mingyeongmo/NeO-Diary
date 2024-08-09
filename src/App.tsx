import { useEffect, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Layout from "components/layout";
import ProtectedRoute from "components/protected-route";
import styled from "styled-components";
import Diary from "pages/Diary";
import DiaryDetail from "components/Post/DiaryDetail";
import MyPage from "pages/MyPage";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "diary",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "write",
            element: <Diary />,
          },
          {
            path: "detail/:id",
            element: <DiaryDetail />,
          },
        ],
      },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <RecoilRoot>
      <Wrapper>
        {isLoading ? "Loading" : <RouterProvider router={router} />}
      </Wrapper>
    </RecoilRoot>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
