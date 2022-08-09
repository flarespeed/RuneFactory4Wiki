import { useState, useGlobal } from "reactn"
import MonsterComp from "../components/MonsterComp"

const Home = () => {

  const [token, setToken] = useGlobal("token")

  return (
    <div>
      {<MonsterComp />}
    </div>
  )
}

export default Home