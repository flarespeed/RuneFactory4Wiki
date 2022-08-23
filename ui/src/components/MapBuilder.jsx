import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate, useParams, Link } from "react-router-dom";


const MapBuilder = () => {

  const [areas, setAreas] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")


  useEffect(() => {
    const { areaName } = useParams()
    axios.get(`http://localhost:1337/area/${ areaName }`)
      .then(res => setAreas(res.data))
  })

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

export default MapBuilder
