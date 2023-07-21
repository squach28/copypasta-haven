import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {

  const [username, setUsername] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/user/self/${Cookies.get('user_id')}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUsername(data.username))
  }, [])

  return (

    <div className="w-full p-3 bg-blue-200">
        <ul className="flex justify-between">
            <li><Link className="text-xl font-bold" to="/">Copypasta Haven</Link></li>
           {Cookies.get('user_id') && username ?
              <li>
                <MenuIcon className="md:hidden" />
                <div className="hidden md:block">
                    {username}
                </div>
              </li> : 
              <li><Link to="/login">Login</Link></li>}
        </ul>
    </div>
  )
}

export default Navbar