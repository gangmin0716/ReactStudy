import {Routes, Route} from 'react-router';
import TopNav from "./components/TopNav.tsx";
import LifeCycle from "./pages/LifeCycle.tsx";
import LocalJsonFetcher from "./pages/LocalJsonFetcher.tsx";
import ExternalApiFetcher from "./pages/ExternalApiFetcher.tsx";
import TodoList from "./pages/TodoList.tsx";

function App() {
  return (
    <>
      <TopNav/>
      <Routes>
        <Route path="/" element={<LifeCycle/>}/>
        <Route path="/local" element={<LocalJsonFetcher/>}/>
        <Route path="external" element={<ExternalApiFetcher/>}/>
        <Route path="todos" element={<TodoList />}/>
      </Routes>
    </>
  )
}

export default App
