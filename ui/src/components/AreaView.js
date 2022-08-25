import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate } from "react-router-dom";


const AreaView = () => {

  const [area, setArea] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")


  useEffect(() => {
    const { id } = useParams()
    axios.get(`http://localhost:1337/subarea/${id}`)
    .then(res => setArea(res.data))
  }, [])

  return (
    <>
      <h2>{area.name}</h2>
      <h3>Connections:</h3>
      <ul>
        {area.monsters.map(monster => <li><Link to={`monster/${monster._id}`}>{monster.name}</Link></li>)}
      </ul>
      <h3>Monsters:</h3>
      <ul>
        {area.monsters.map(monster => <li><Link to={`monster/${monster._id}`}>{monster.name}</Link></li>)}
      </ul>
    </>
  )
}

export default AreaView