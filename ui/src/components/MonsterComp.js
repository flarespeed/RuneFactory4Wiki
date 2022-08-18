import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate, useParams, Link } from "react-router-dom";

const MonsterComp = () => {

  const [monster, setMonster] = useState([])
  const [area, setArea] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")


  useEffect(() => {
    const { id } = useParams()
    axios.get(`http://localhost:1337/monster/${ id }`)
    .then(
      res => setMonster(res.data)
      axios.get(`http://localhost:1337/subarea/${monster.area}`)
      .then(res => setArea(res.data))
    )
  })

  return (
    <>
      <h3>{monster.name}</h3>
      <p>found in: <Link to={`/area/${area._id}`}>{area.name}</a></p>

    </>
  )
}

export default MonsterComp