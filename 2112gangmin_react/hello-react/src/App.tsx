import './App.css'

type StudentCardProps = {
  name: string;
  school?: string;
}
const StudentCard = (props: StudentCardProps) => {
  return (
    <div>
      <h2>학생 카드</h2>
      <p>이름: {props.name}</p>
      <p>학교: {props.school}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <StudentCard name="장강민" school="대구소프트웨어마이스터고등학교" />
    </div>
  );
}
export default App;