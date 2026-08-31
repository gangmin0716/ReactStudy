import './App.css'

type CourseCardProps = {
  title: string;
  level: string;
  students: number;
}
const CourseCard = (props: CourseCardProps)=> {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>난이도: {props.level}</p>
      <p>수강 인원: {props.students}</p>
    </article>
  )
}

function App() {
  return (
    <div>
      <CourseCard
        title="React 기초"
        level="입문"
        students={24}
      />
      <CourseCard
        title="Python 데이터 분석"
        level="중급"
        students={18}
      />
      <CourseCard
        title="생성형 AI 활용"
        level="입문"
        students={31}
      />
    </div>
  );
}
export default App;