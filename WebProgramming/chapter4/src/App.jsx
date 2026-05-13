import Header from "./component/Header.jsx";
import Body from "./component/Body.jsx";
import Footer from "./component/Footer.jsx";

function App() {
  const name = "구지면";
  return (
    <div className="App">
      <Header />
      <Body name={name} school={"대소고"}/>
      <Footer />
    </div>
  );
}

export default App;
