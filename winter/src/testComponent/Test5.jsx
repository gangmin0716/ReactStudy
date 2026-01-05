import { useEffect } from "react";

const Test5 = () => {
  useEffect(()=> {
    console.log('컴포넌트가 마운트되었습니다.')
  }, [])

  return(
    <>
      <h1>
        useEffect 기초
      </h1>
      <p>콘솔을 확인하세요.</p>
    </>
  )
}

export default Test5;