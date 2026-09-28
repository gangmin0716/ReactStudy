import {Link} from "react-router";

function TopNav(){
  return (
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/intro"}>Intro</Link>
      </div>
  )
}

export default TopNav;