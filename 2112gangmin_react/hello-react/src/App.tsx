import { useState } from "react";
type MyDataType = {
  front: string[];
  back: string[];
};
type TopCompProps = {
  myData: MyDataType;
};
const TopComp = ({ myData }: TopCompProps) => {
  return (
    <>
      <ol>
        <li>프론트엔드</li>
        <ul>
          {myData.front.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <li>백엔드</li>
        <ul>
          {myData.back.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </ol>
    </>
  );
};

function App() {
  const [myData, setMyData] = useState({
    front: ["HTML5", "CSS3", "Javascript", "jQuery"],
    back: ["Java", "Oracle", "JSP", "Spring Boot"],
  });
  const addFront = () => {
    myData.front.push("React");
    setMyData(myData);
  };
  const addBack = () => {
    const newBack = [...myData.back, "Node.js"];
    const newMyData = { ...myData, back: newBack };
    setMyData(newMyData);
  };
  return (
    <>
      <h2>React-Shallow Comparison</h2>
      <TopComp myData={myData} />
      <button type="button" onClick={addFront}>
        프론트엔드추가
      </button>
      <button type="button" onClick={addBack}>
        백엔드추가
      </button>
    </>
  );
}

export default App;
