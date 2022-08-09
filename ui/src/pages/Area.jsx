import { useState, useGlobal } from "reactn"
import AreaView from "../components/AreaView"

const Area = () => {

  const [token, setToken] = useGlobal("token")

  return (
    <div>
      {<AreaView />}
    </div>
  )
}

export default Area