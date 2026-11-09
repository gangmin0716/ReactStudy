import { NavLink } from "react-router";

const TopNavi = () => {
  return (
    <nav>
      <NavLink to="/basic">기본 사용법</NavLink>&nbsp;
      <NavLink to="/attendance">출결 관리</NavLink>&nbsp;
      <NavLink to="/cart">장바구니</NavLink>&nbsp;
    </nav>
  );
};

export default TopNavi;
