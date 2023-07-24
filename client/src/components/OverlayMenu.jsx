import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const OverlayMenu = () => {

    const navigate = useNavigate()

    const logout = () => {
        Cookies.remove('access_token')
        Cookies.remove('user_id')
        navigate(0)
      }

    return (
        <div className="absolute z-10 bg-slate-500 w-screen overflow-y-hidden">
            <nav>
                <ul className="flex flex-col gap-2 items-center font-bold p-2">
                    <li>{Cookies.get('user_id')}</li>
                    <li>Your Likes</li>
                    <li onClick={logout}>Logout</li>
                </ul>
            </nav>
        </div>
    )
}

export default OverlayMenu