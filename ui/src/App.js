import { setGlobal, addCallback } from "reactn"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Map from "./pages/Map";
import MapList from "./pages/MapList";
import Area from "./pages/Area";
import Monster from "./pages/Monster";
import Navbar from "./components/Navbar";

function App() {

  const rehydrateState = () => {
    const state = localStorage.getItem("globalState")
    if (state) return JSON.parse(state)

    return {
      token: null,
      user: null
    }
  }

  setGlobal(rehydrateState())

  addCallback(state => {
    localStorage.setItem("globalState", JSON.stringify(state))
  })

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" />
          <Route path=":areaName" element={<Map />} />
          <Route path="arealist" element={<MapList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/area/" />
          <Route path=":id" element={<Area />} />
        <Route path="/monster/" />
          <Route path=":id" element={<Monster />} />
        <Route path="*" />
      </Routes>
    </Router>
  );
}

export default App;
