import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate, Link } from "react-router-dom";


const MapListComp = () => {

  const [areas, setAreas] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")


  useEffect(() => {
    axios.get("http://localhost:1337/area/arealist")
      .then(res => setAreas(res.data))
  }, [])

  return (
    <>
      <div>
        <ul>
        {areas.map(area => <li><Link to={`/area/${area._id}`}>{area.name}</Link></li>)}
        </ul>
      </div>
    </>
  )
}

export default MapListComp
