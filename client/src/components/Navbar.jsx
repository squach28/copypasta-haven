import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full p-3 bg-blue-200">
        <ul className="flex justify-between">
            <li><Link className="text-xl font-bold" to="/">Copypasta Haven</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </div>
  )
}

export default Navbar