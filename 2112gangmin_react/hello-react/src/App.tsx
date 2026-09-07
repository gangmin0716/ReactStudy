import "./App.css";
import { useState } from "react";
function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const handleAdd = () => {
    setNumbers([...numbers, numbers.length]); // spread 연산자로 새 배열 만들기
    console.log(numbers);
  };
  return (
    <>
      {numbers.map(it => (
        <p>{it}</p>
      ))}
      <button onClick={handleAdd}>Add</button>
    </>
  );
}
export default App;
