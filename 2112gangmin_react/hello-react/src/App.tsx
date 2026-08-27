import './App.css'

type StudentCardProps = {
  name: string;
  school?: string;
}

type Bookprops = {
  title: string;
  author: string;
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

const BookCard = (props: Bookprops) => {
  return (
    <div>
      <h2>책 카드</h2>
      <p>이름: {props.title}</p>
      <p>작가: {props.author}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <StudentCard name="장강민" school="대구소프트웨어마이스터고등학교" />
      <BookCard title="리액트 입문" author="강장민"/>
    </div>
  );
}
export default App;