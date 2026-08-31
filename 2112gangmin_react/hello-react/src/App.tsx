import "./App.css";

type CourseCardProps = {
  title: string;
  level: string;
  students: number;
  topics: string[];
}

const CourseCard = ({ title, level, students, topics }: CourseCardProps) => {
  const topicItems = [];
  for (let i = 0; i < topics.length; i++) {
    topicItems.push(<li>{topicItems[i]}</li>);
  }
  return (
    <article>
      <h2>{title}</h2>
      <p>{level}</p>
      <p>{students}</p>
      <ul>{topicItems}</ul>
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
