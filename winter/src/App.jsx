import "./firebase/firebace"
import { useState } from "react";
import Layout from './components/Layout'
// import { DemoAuth } from "./sandbox/DemoAuth"
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Layout isLogin={isLogin} setIsLogin={setIsLogin} />
  )
}

export default App
