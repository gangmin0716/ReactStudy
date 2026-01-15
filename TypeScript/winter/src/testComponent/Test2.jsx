import { useState } from "react";

const Test2 = () => {
  const [count, setCount] = useState(0);

  const handleOnClickMinus = () => {
    return (
      setCount(count - 1)
    )
  }

  const handleOnClickPlus = () => {
    return (
      setCount(count + 1)
    )
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleOnClickMinus}>-1</button>
      <button onClick={handleOnClickPlus}>+1</button>
    </>

  )
}


export default Test2;