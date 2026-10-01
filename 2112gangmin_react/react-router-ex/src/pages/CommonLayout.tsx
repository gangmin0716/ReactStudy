import { Outlet } from "react-router";
import TopNav from "../components/TopNav";

const CommonLayout = () => {
  return (
    <div>
      <TopNav />
      <Outlet />
      <footer>2026</footer>
    </div>
  );
};
export default CommonLayout;
