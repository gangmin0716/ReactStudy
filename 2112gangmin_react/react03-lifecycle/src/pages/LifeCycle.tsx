import { useState, useEffect, type CSSProperties } from
    'react';
type MoveBoxProps = {
  initPosition: number;
};
function MoveBox({ initPosition }: MoveBoxProps) {
  console.log('LifeCycle==>1.컴포넌트 실행(함수 호출)'); // 1
  const [position, setPosition] = useState(initPosition); //2
  const [leftCount, setLeftCount] = useState(1);
  const boxStyle: CSSProperties = {//3
    backgroundColor: 'red',
    position: 'relative',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    margin: '10px',
    lineHeight: '100px',
    left: `${position}px`,
  };
  const moveLeft = () => {//4
    setPosition(() => position - 20);
    setLeftCount(() => leftCount + 1);
  };
  const moveRight = () => {
    setPosition(() => position + 20);
  };
  useEffect(() => {//6
    console.log('useEffect 실행==>3.컴포넌트 마운트 ' + leftCount);
    return () => {
      console.log('useEffect 실행==>4.컴포넌트 언마운트(cleanup)' + leftCount);
    };
// }); // 1. 의존성 배열 생략
// }, []); // 2. 빈 의존성 배열
  }, []); // 3. leftCount를 의존성으로 지정
  console.log('return실행==>2.렌더링(return문)'); //5
  return (
    <div>
      <h4>함수형 컴포넌트의 생명주기</h4>
      <div style={boxStyle}>{leftCount}</div>{/*7 */}
      <input type="button" value="좌측이동"
             onClick={moveLeft} />
      <input type="button" value="우측이동"
             onClick={moveRight} />
    </div>
  );
}
function LifeCycle() {
  return (
    <>
      <h2>React Hook - useEffect</h2>
      <MoveBox initPosition={50} /> {/* 8 */}
    </>
  ); }
export default LifeCycle;