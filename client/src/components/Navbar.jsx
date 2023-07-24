import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';


const Navbar = (props) => {

  const [username, setUsername] = useState(null)


  useEffect(() => {
    if(Cookies.get('user_id')) {
      fetch(`http://localhost:8080/api/users/user/self/${Cookies.get('user_id')}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setUsername(data.username))
    }

  }, [])



  return (

    <div className="w-full p-3 bg-blue-200">
        <ul className="flex justify-between">
            <li><Link className="text-xl font-bold" to="/">Copypasta Haven</Link></li>
           {Cookies.get('user_id') && username ?
              <li>
                <div className=" flex  gap-5 md:hidden">
                  <Link to="createPost"><PostAddIcon className="cursor-pointer" /></Link>
                  <MenuIcon className="cursor-pointer" onClick={props.toggleOverlay} />
                </div>
                <div className="hidden md:block cursor-pointer">
                    Hi {username}!
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
  )
}

export default Navbar