import { useState } from "react";

const Body = () => {

  const [count, setCount] = useState(0)
  const onIncrease = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>증가</button>
    </div>
  );
}

export default Body