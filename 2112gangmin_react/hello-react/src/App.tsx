import './App.css'

type MyComponentProps = {
  myData: string;
}
const MyComponent = (props: MyComponentProps) => {
  return (
    <div>
      {props.myData}
    </div>
  )
}

function App() {
  return (
    <div>
      <MyComponent myData="프롭스데이타"/>
    </div>
  );
}
export default App;