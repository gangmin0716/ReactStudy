type FrontCompProps = {
  propData1: string[];
  frTitle: string;
};
type BackCompProps = {
  propData2: string[];
  baTitle: string;
};
function FrontComp(props: FrontCompProps) {
  return (
    <>
      <li>{props.frTitle}</li>
      {props.propData1.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </>
  );
}
const BackComp = ({ propData2, baTitle }: BackCompProps) => {
  return (
    <>
      <li>{baTitle}</li>
      <ul>
        {propData2.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
};
function App() {
  const frontData: string[] = ["HTML5", "CSS3", "JavaScript"];
  const backData: string[] = ["Java", "Oracle", "JSP"];
  return (
    <>
      <h2>React Props</h2>
      <ol>
        <FrontComp
          propData1={frontData}
          frTitle="프론트엔드"
        />

        <BackComp
          propData2={backData}
          baTitle="백엔드"
        />
      </ol>
    </>
  );
}
export default App;