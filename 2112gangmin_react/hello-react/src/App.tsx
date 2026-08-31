type Skill = {
  id: number;
  name: string;
};

type FrontCompProps = {
  propData1: Skill[];
  frTitle: string;
};
type BackCompProps = {
  propData2: Skill[];
  baTitle: string;
};
function FrontComp(props: FrontCompProps) {
  return (
    <>
      <li>{props.frTitle}</li>
      {props.propData1.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </>
  );
}
const BackComp = ({ propData2, baTitle }: BackCompProps) => {
  return (
    <>
      <li>{baTitle}</li>
      <ul>
        {propData2.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
};
function App() {
  const frontData: Skill[] = [
    { id: 1, name: "HTML5" },
    { id: 2, name: "CSS3" },
    { id: 3, name: "JavaScript" },
  ];
  const backData: Skill[] = [
    { id: 1, name: "Java" },
    { id: 2, name: "Oracle" },
    { id: 3, name: "JSP" },
  ];
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