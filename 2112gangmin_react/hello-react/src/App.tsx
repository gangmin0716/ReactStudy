import './App.css'
function DashboardHeader() {
  return (
    <header>
      <h1>관리자 대시보드</h1>
      <p>서비스의 주요 통계를 확인하세요.</p>
    </header>
  );
}
function StatCard() {
  return (
    <article className="stat-card">
      <div className="stat-icon"> </div>
      <strong>1,250</strong>
      <p>방문자 수</p>
    </article>
  );
}
function UpdateInfo() {
  return (
    <footer className="update-info">마지막 업데이트: 오
      늘 오전 10시</footer>
  );
}
function App() {
  return (
    <main>
      <DashboardHeader />
      <section className="stat-list">
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </section>
      <UpdateInfo />
    </main>
  );
}
export default App;