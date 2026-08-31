import "./App.css";

type CityListProps = {
  cities: string[];
};


const CityList = ({ cities }: CityListProps) => {
  return (
    <article>
      {cities.map((city) => (
        <li key={city}>{city}</li>
      ))}
    </article>
  );
};

function App() {
  const cities: string[] = ["서울", "부산", "대구", "인천"];
  return (
    <main>
      <h2>도시 목록</h2>
      <CityList cities={cities} />
    </main>
  );
}
export default App;
