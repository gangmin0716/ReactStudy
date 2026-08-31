import "./App.css";

type TeamCardProp = {
  name: string;
  leader: string;
  members: number;
};

type ProdectCardProp = {
  name: string;
  price: number;
}

const TeamCard = ({name, leader, members} : TeamCardProp) => {
  return(
    <section>
      <h2>{name}</h2>
      <p>팀장: {leader}</p>
      <p>인원: {members}</p>
    </section>
  )
};

const ProdectCard = (props: ProdectCardProp) => {
  return(
    <div>
      <h2>{props.name}</h2>
      <p>{props.price}원</p>
    </div>
  )
}

function App() {
  return (
    <main>
      <h1>프로젝트 팀</h1>
      <TeamCard name="Alpha" leader="민준" members={4} />
      <TeamCard name="Beta" leader="서연" members={3} />
      <TeamCard name="Gamma" leader="지훈" members={5} />

      <ProdectCard name="키보드" price={50000} />
    </main>
  );
}
export default App;
