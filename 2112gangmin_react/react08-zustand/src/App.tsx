import TopNavi from "./components/TopNavi.tsx";
import { Route, Routes } from "react-router";
import BasicApp from "./exam1/BasicApp.tsx";
import CartApp from "./exam2/CartApp.tsx";
import CheerApp from "./exam3/CheerApp.tsx";

function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/basic" element={<BasicApp />} />
        <Route path="/cart" element={<CartApp />} />
        <Route path="/cheer" element={<CheerApp />} />
        {/*<Route path="/attendance" element={<AttendanceApp />} />*/}
      </Routes>
    </>
  );
}

export default App;
