import "./App.css";

const Star = () => {
  return (
    <>
      <span className="yellow-star">★</span>
    </>
  );
}

function App() {
  return (
    <main>
      <h1>게임 만족도</h1>
      <p>이 게임의 만족도는 별 5개입니다.</p>
      <section className="star-list">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </section>
    </main>
  );
}

export default App;
