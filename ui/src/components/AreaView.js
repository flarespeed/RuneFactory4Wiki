import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate } from "react-router-dom";


const AreaView = () => {

  const [area, setArea] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")
  const [id, setId] = useGlobal("id")


  useEffect(() => {
    if (id) {
      axios.get("http://localhost:1337/subarea/"+id)
      .then(res => setArea(res.data))
    } else {
      useNavigate("/")
    }
  })

  const useAreaNavigate = (newId) => {
    setId(newId);
    useNavigate("/area")
  }

  const useMonsterNavigate = (newId) => {
    setId(newId);
    useNavigate("/monster")
  }

  return (
    <>
      <h2>{area.name}</h2>
      <h3>Connections:</h3>
      <ul>
        {area.north && <li onClick={() => useAreaNavigate(area._id)}>{area.north}</li>}
        {area.east && <li onClick={() => useAreaNavigate(area._id)}>{area.east}</li>}
        {area.south && <li onClick={() => useAreaNavigate(area._id)}>{area.south}</li>}
        {area.west && <li onClick={() => useAreaNavigate(area._id)}>{area.west}</li>}
      </ul>
      <h3>Monsters:</h3>
      <ul>
        {area.monsters.map(monster => <li><Link to={`monster/${monster._id}`}>{monster.name}</Link></li>)}
      </ul>
    </>
  )
}

export default AreaView