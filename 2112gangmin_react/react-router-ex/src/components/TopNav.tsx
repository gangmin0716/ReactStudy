import {NavLink} from "react-router";

const TopNav = () => {
  return (
    <nav className="top-navi">
    <NavLink to="/">Home</NavLink>
      <NavLink to="/notice">Notice</NavLink>
    <NavLink to="/faq">FAQ</NavLink>
    </nav>
  )
}

export default TopNav;