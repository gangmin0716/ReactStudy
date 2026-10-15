import {NavLink} from "react-router";

const TopNav = () => {
  return (
    <nav>
      <NavLink to='/'>수명주기</NavLink>&nbsp;
      <NavLink to='/local'>내부통신</NavLink>&nbsp;
      <NavLink to='/external'>외부통신</NavLink>&nbsp;
      <NavLink to='/todos'>todo</NavLink>
    </nav>
  )
}

export default TopNav