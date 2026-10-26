import { NavLink } from "react-router";
const TopNavi = () => {
  return (
    <nav>
      <NavLink to="/use-ref1">useRef1</NavLink>&nbsp;
      <NavLink to="/use-ref2">useRef2</NavLink>&nbsp;
      <NavLink to="/use-ref3">useRef3</NavLink>&nbsp;
      <NavLink to="/use-memo">useMemo</NavLink>&nbsp;
      <NavLink to="/use-memo2">useMemoPractice</NavLink>&nbsp;
      <NavLink to="/use-callback">useCallback</NavLink>&nbsp;
      <NavLink to="/use-id">useId</NavLink>&nbsp;
    </nav>
  );
};

export default TopNavi;
