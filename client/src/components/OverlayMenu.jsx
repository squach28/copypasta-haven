import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const OverlayMenu = () => {

    const navigate = useNavigate()

    const logout = () => {
        Cookies.remove('access_token')
        Cookies.remove('user_id')
        navigate('/')
        navigate(0)
      }

    return (
        <div className={`absolute z-10 bg-slate-500 w-screen overflow-x-hidden overflow-y-hidden md:w-1/5 md:text-end md:right-0`}>
            <nav>
                <ul className="flex flex-col gap-2 items-center font-bold p-2 hover:cursor-pointer">
                    <li>{Cookies.get('user_id')}</li>
                    <li>Your Likes</li>
                    <li onClick={logout}>Logout</li>
                </ul>
            </nav>
        </div>
    )
}

export default OverlayMenu