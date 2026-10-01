import { Link } from "react-router";

const Notice = () => {
  return (
    <div>
      <h2>공지사항</h2>
      <ul>
        <li>
          <Link to="/notice/1">1번 공지 사항</Link>
        </li>
        <li>
          <Link to="/notice/2">2번 공지 사항</Link>
        </li>
        <li>
          <Link to="/notice/3">3번 공지 사항</Link>
        </li>
      </ul>
    </div>
  );
};

export default Notice;
