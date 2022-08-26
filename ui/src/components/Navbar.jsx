import { Link } from "react-router-dom"
import { useGlobal } from "reactn"

import LogoutButton from "./LogoutButton"


const Navbar = () => {
  const [user, setUser] = useGlobal("user")

  return (
    <nav>
      <div className="navdiv">
        <Link to="/">Rune Factory 4 area list</Link>
      </div>

    </nav>
  )
}

export default Navbar

// <div className="navdiv">
//   {!user && <>
//     <Link to="/signup">Signup</Link>
//     <Link to="/login">Login</Link>
//   </>}
//   {user && <LogoutButton to="/">Logout</LogoutButton>}
// </div>