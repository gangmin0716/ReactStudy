import { useParams } from "react-router";
import { useEffect, useState } from "react";

const NoticeDetail = () => {
  const { id } = useParams();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("resize 이벤트 등록");
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      console.log("resize 이벤트 해제");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(`백엔드에게 ${id}번 공지사할 요청`);
  }, [id]);
  return (
    <>
      <h2>{id}번 공지사항</h2>
      <p>{width}</p>
    </>
  );
};

export default NoticeDetail;
