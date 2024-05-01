import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import Layout from "components/layout";
import ProtectedRoute from "components/protected-route";
import styled from "styled-components";
import Diary from "pages/Diary";
import Posts from "components/Post/posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/diary/list/:month",
        element: <Posts />,
      },
      {
        path: "/diary/write",
        element: <Diary />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
    <Wrapper>
      {isLoading ? "Loading" : <RouterProvider router={router} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default App;
