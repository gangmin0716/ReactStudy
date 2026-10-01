import { useParams } from "react-router";

const NoticeDetail = () => {
  const { id } = useParams();

  return <h2>{id}번 공지사항</h2>;
};

export default NoticeDetail;
