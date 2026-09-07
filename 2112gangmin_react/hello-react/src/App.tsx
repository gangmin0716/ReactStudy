import "./App.css";
import {useState} from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
  }

  return (
    <>
      {count}
      <button onClick={handleAdd}>Add</button>
    </>
  );
}
export default App;
