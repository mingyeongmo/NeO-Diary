import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>layout으로 감싸져있습니다.</h2>
      <Outlet />
    </>
  );
}
