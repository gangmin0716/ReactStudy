import "./App.css";

const FrontComponent = () => {
  return (
    <>
      <li>
        프론트엔드
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>jQuery</li>
        </ul>
      </li>
    </>
  );
};

const BackComponent = () => {
  return (
    <>
      <li>
        백엔드
        <ul>
          <li>Java</li>
          <li>Oracle</li>
          <li>JSP</li>
          <li>Spring Boot</li>
        </ul>
      </li>
    </>
  );
};

const Form = () => {
  return (
    <>
      <form>
        <select name="gubun">
          <option value="front">프론트엔드</option>
          <option value="back">백엔드</option>
        </select>
        <input type="text" name="title" />
        <input type="submit" value="추가" />
      </form>
    </>
  );
};

function App() {
  return (
    <>
      <h2>React-기본</h2>
      <ol>
        <FrontComponent />
        <BackComponent />
        <BackComponent />
      </ol>
      <Form />
    </>
  );
}

export default App;
