import "./App.css";

type CourseCardProps = {
  title: string;
  level: string;
  students: number;
  topics: string[];
}

const CourseCard = ({ title, level, students, topics }: CourseCardProps) => {
  return (
    <article>
      <h2>{title}</h2>
      <p>난이도: {level}</p>
      <p>주요 학습 내용: {students}</p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </article>
  );
};

function App() {
  return (
    <main>
      <CourseCard title="React 기초" level="입문" students={24} topics={['컴포넌트', 'JSX', 'Props']}/>
    </main>
  );
}
export default App;
