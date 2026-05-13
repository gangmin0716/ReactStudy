import Header from "./component/Header.jsx";
import Body from "./component/Body.jsx";
import Footer from "./component/Footer.jsx";

const ChildComp = () => {
  return <div>자식 컴포넌트입니다.</div>
}

function App() {
  return (
    <div className="App">
      <Header />
      <Body>
        <ChildComp />
      </Body>
      <Footer />
    </div>
  );
}

export default App;
