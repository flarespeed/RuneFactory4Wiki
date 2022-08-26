import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate, useParams, Link } from "react-router-dom";


const AreaView = () => {

  const [area, setArea] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")
  const [exits, setExits] = useState([])
  const [monsters, setMonsters] = useState([])
  var { id } = useParams()

  const handleResp = (res) => {
    setArea(res.data);
    setExits(res.data.exits);
    setMonsters(res.data.monsters);
  };

  useEffect(() => {
    axios.get(`http://localhost:1337/subarea/${id}`)
    .then(res => handleResp(res))
  }, [id]);


  return (
    <>
      <h2><Link to={`/area/${area.area}`}>back to area</Link></h2>
      <h3>Connections:</h3>
      <ul>
        {exits.map(area => <li><Link to={`/subarea/${area.id}`}>{area.direction}: {area.name}</Link></li>)}
      </ul>
      <h3>Monsters:</h3>
      <ul>
        {monsters.map(monster => <li><Link to={`/monster/${monster._id}`}>{monster.name}</Link></li>)}
      </ul>
    </>
  )
}

export default AreaView