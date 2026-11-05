import { NavLink } from "react-router";

const TopNavi = () => {
  return (
    <nav>
      <NavLink to="/use-optimistic">useOptimistic</NavLink>&nbsp;
      <NavLink to="/like">Like</NavLink>&nbsp;
      <NavLink to="/use-action-state">useActionState</NavLink>&nbsp;
      <NavLink to="/nickname">Nickname</NavLink>&nbsp;
      <NavLink to="/score">Score</NavLink>&nbsp;
      <NavLink to="/use-form-status">useFormStatus</NavLink>&nbsp;
      <NavLink to="/test">Action-test</NavLink>&nbsp;
    </nav>
  );
};

export default TopNavi;
