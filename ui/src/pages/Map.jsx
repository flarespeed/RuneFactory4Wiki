import { useState, useGlobal } from "reactn"
import MapBuilder from "../components/MapBuilder"

const Map = () => {

  const [token, setToken] = useGlobal("token")

  return (
    <div>
      {<MapBuilder />}
    </div>
  )
}

export default Map