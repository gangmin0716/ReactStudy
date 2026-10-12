import { useParams } from "react-router";
import { useEffect, useState } from "react";

const NoticeDetail = () => {
  const { id } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
    const handleMove = (e:MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    console.log(`백엔드에게 ${id}번 공지사할 요청`);
  }, [id]);
  return (
    <>
      <h2>{id}번 공지사항</h2>
      <p>{width}</p>
      <p>
        {x}, {y}
      </p>
    </>
  );
};

export default NoticeDetail;
