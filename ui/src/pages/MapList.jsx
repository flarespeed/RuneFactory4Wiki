import { useState, useGlobal } from "reactn"
import MapListComp from "../components/MapListComp"

const MapList = () => {

  const [token, setToken] = useGlobal("token")

  return (
    <div>
      {<MapListComp />}
    </div>
  )
}

export default MapList