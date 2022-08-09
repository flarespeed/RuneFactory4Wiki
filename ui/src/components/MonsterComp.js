import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate } from "react-router-dom";


const MapBuilder = () => {

  const [monster, setMonster] = useState([])
  const [area, setArea] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")
  const [id, setId] = useGlobal("id")


  useEffect(() => {
    if (id) {
      axios.get("http://localhost:1337/monster/"+id)
      .then(res => setMonster(res.data))
      axios.get("http://localhost:1337/subarea/"+monster.area)
      .then(res => setArea(res.data))
    } else {
      useNavigate("/")
    }
  })

  const toArea = (newId) => {
    setId(newId);
    useNavigate("/area")
  }

  return (
    <>
      <h3>{monster.name}</h3>
      <p>found in: <a onClick={() => toArea(area._id)}>{area.name}</a></p>

      // <ul>
      // {areas.map(area => <li onClick={() => toArea(area._id)}>{area.name}</li>)}
      // </ul>
    </>
  )