import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { getUserLikedCopypastas  } from "../api/user"
import { getCopypastaById } from "../api/copypasta"
import Cookies from "js-cookie"
import Card from "../components/Card"

const LikesPage = () => {

  const [likes, setLikes] = useState([])

  useEffect(() => {
    getUserLikedCopypastas(Cookies.get('user_id'))
      .then(res => {
        res.map(id => {
          getCopypastaById(id)
            .then(copypasta => setLikes(prevLikes => [...prevLikes, copypasta]))
        })
      })
  }, [])

  return (
    <div className="bg-slate-200">
      <Navbar />
      <div>
        <h1 className="text-3xl">My Likes</h1>
        {likes.length > 0 ? 
          <div>
            {likes.map(like => {
            return <Card key={like._id} {...like} />})}
          </div>
        : <div><p>Looking a little empty there :(</p></div>}
      </div>
    </div>
  )
}

export default LikesPage