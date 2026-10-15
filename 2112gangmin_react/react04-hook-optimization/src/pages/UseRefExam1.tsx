import { useRef, useState } from "react";
const UseRefExam1 = () => {
  const [stateNum, setStateNum] = useState<number>(0);
  const refNum = useRef<number>(0);
  let myNum = 0;
  const plusState = () => {
    setStateNum(stateNum + 1);
    console.log("State 증가", stateNum);
  };
  const plusRef = () => {
    refNum.current = refNum.current + 1;
    console.log("Ref 증가", refNum.current);
  };
  const plusMyNum = () => {
    console.log("일반 변수 증가", ++myNum);
  };
  return (
    <>
      <h2>useRef 사용하기 1</h2>
      <div>
        <p>State : {stateNum}</p>
        {/* eslint-disable-next-line react-hooks/refs -- 렌더링 중 ref 값을 의도적으로 노출해 상태/변수와의 차이를 보여주는 예제 */}
        <p>Ref : {refNum.current}</p>
        <p>myNum : {myNum}</p>

        <button onClick={plusState}>State 증가</button>

        <button onClick={plusRef}>Ref 증가</button>
        <button onClick={plusMyNum}>myNum 증가</button>
      </div>
    </>
  );
};

export default UseRefExam1;
