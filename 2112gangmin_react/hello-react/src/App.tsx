import "./App.css";
function App() {
  let count = 0;
  const handleAdd = () => {
    count++;
    console.log(count);
  };
  return (
    <>
      {count}
      <button onClick={handleAdd}>Add</button>
    </>
  );
}
export default App;
