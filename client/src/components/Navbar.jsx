import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import OverlayMenu from "./OverlayMenu";


const Navbar = () => {

  const [username, setUsername] = useState(null)
  const [showMenu, setShowMenu] = useState(false)


  useEffect(() => {
    if(Cookies.get('user_id')) {
      fetch(`http://localhost:8080/api/users/user/self/${Cookies.get('user_id')}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setUsername(data.username))
    }

  }, [])

  const toggleMenu = () => {
    setShowMenu(show => !show)
  }



  return (

    <div>
      <div className="w-full p-3 bg-blue-200">
          <ul className="flex justify-between">
              <li><Link className="text-xl font-bold" to="/">Copypasta Haven</Link></li>
             {Cookies.get('user_id') && username ?
                <li>
                  <div className="flex gap-5 md:hidden">
                    <Link to="/createPost"><PostAddIcon className="cursor-pointer" /></Link>
                    <MenuIcon className="cursor-pointer" onClick={toggleMenu} />
                  </div>
                  <div className="hidden md:flex md:gap-5 cursor-pointer">
                    <Link to="/createPost"><PostAddIcon className="cursor-pointer" /></Link>
                    <p onClick={toggleMenu}>Hi {username}!</p>
                  </div>
                </li> :
                <li>
                  <div className="flex gap-5 font-bold">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </div>
                </li>}
          </ul>
      </div>
      {showMenu ? <OverlayMenu /> : null}
    </div>
  )
}

export default Navbar