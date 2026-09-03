import FrontComp from "./components/FrontComp.tsx";
import BackComp from "./components/BackComp.tsx";

function App() {
  const frontData: string[] = ["HTML", "CSS", "JavaScript"];
  const backData: string[] = ["Java", "Oracle", "JSP"];

  return (
    <main>
      <h2>React Props</h2>
      <ol>
        <FrontComp propData1={frontData} frTitle="프론트엔드"/>
        <BackComp propData2={backData} baTitle="백엔드"/>
      </ol>
    </main>
  );
}
export default App;