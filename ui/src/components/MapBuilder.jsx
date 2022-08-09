import axios from "axios"
import { useState, useGlobal, useEffect } from "reactn"
import { useNavigate } from "react-router-dom";


const MapBuilder = () => {

  const [areas, setAreas] = useState([])
  const [token, setToken] = useGlobal("token")
  const [user, setUser] = useGlobal("user")
  const [id, setId] = useGlobal("id")


  useEffect(() => {
    axios.get("http://localhost:1337/area/default")
      .then(res => setAreas(res.data))
  })

  const toArea = (newId) => {
    setId(newId);
    useNavigate("/area")
  }


  return (
    <>
      <ul>
      {areas.map(area => <li onClick={() => toArea(area._id)}>{area.name}</li>)}
      </ul>
      // {areas.map(area => <article key={area._id}>
      //   <p>{area.body}</p>
      //   <small>-{area.user.username}</small>
      //   {area.user._id === user?._id && <button onClick={() => handleDelete(area._id)}>X</button>}
      // </article>)}
    </>
  )
}

export default MapBuilder
