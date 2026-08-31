import "./App.css";

type TeamCardProp = {
  name: string;
  leader: string;
  members: number;
};

const TeamCard = (props: TeamCardProp) => {
  return(
    <section>
      <h2>{props.name}</h2>
      <p>팀장: {props.leader}</p>
      <p>인원: {props.members}</p>
    </section>
  )
};

function App() {
  return (
    <main>
      <h1>프로젝트 팀</h1>
      <TeamCard name="Alpha" leader="민준" members={4} />
      <TeamCard name="Beta" leader="서연" members={3} />
      <TeamCard name="Gamma" leader="지훈" members={5} />
    </main>
  );
}
export default App;
