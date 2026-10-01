import { useEffect, useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const id = setInterval(() => {
      console.log(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h2>학교 지원 센터</h2>
      <h3>{count}</h3>
      <button onClick={addCount}>+</button>
    </>
  );
};

export default Home;
