import {Link} from "react-router";

function Home() {
  return (
      <div>
        Intro
        <ul>
          <li><Link to="/intro/1">Detail 1</Link></li>
          <li><Link to="/intro/2">Detail 2</Link></li>
        </ul>
      </div>
  )
}

export default Home