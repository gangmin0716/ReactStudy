// 기초 코드
import { useRef } from "react";
function UseRefPractice() {
  const countRef = useRef<number>(0);
  const divRef = useRef<HTMLDivElement>(null);
  const moveToAssignment = () => {
    countRef.current = countRef.current + 1;
    console.log(countRef.current);
    divRef.current?.scrollIntoView();
  };
  return (
    <>
      <h2>수업 페이지</h2>
      <button onClick={moveToAssignment}>과제 바로가기</button>
      <div style={{ height: "600px" }}>
        <h3>수업 내용</h3>
        <p>오늘의 수업 내용을 확인하세요.</p>
      </div>
      <div ref={divRef}>
        <h3>과제 제출</h3>
        <p>과제를 이곳에 제출하세요.</p>
      </div>
    </>
  );
}
export default UseRefPractice;
