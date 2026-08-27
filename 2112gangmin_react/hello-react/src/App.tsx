import "./App.css";

function App() {
  const studentName = "김민준";
  const score = 85;
  const handleClick = () => {
    alert("확인했습니다.");
  }
  return (
    <>
      <h1 className="title">{studentName}의 성적</h1>
      <label htmlFor="score">점수</label>
      <input id="score" type="number" />
      <p>결과: {score >= 60 ? "합격" : "불합격"}</p>
      <button onClick={handleClick}>
        결과 확인
      </button>
    </>
  );
}

export default App;
