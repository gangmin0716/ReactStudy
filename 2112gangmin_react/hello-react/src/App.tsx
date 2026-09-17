import jqueryLogo from "./assets/jquery.png";

function App() {
  const myStyle = {
    color: "white",
    backgroundColor: "dodgerblue",
    padding: "10px",
    fontFamily: "Verdana",
  };

  const iWidth = { maxWidth: "300px" };
  return (
    <>
      <h2>React-Style</h2>
      <ol>
        <li>프론트엔드</li>
        <ul>
          <li>
            <img src="/img/html_css_js.png" style={iWidth} />
          </li>
          <li>
            <img src={jqueryLogo} style={iWidth} />
          </li>
          <li>
            <img src="http://nakja.co.kr/images/reactjs.png" style={iWidth} />
          </li>
        </ul>
        <li>
          백엔드
          <ul>
            <li id="backEndSub">Java</li>
            <li className="warnings">Oracle</li>
            <li style={myStyle}>JSP</li>
          </ul>{" "}
        </li>
      </ol>
    </>
  );
}
export default App;
