/* eslint-disable react/prop-types */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Card = (props) => {

  const [author, setAuthor] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(props.likes)

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/user/username/${props.author}`)
      .then(res => res.json())
      .then(data => setAuthor(data))

    fetch(`http://localhost:8080/api/users/user/like?userId=${Cookies.get('user_id')}&postId=${props._id}`)
      .then(res => res.json())
      .then(data => setLiked(data.success))
      .catch(err => console.log(err))
  
  }, [])
  const navigate = useNavigate()

  const likeCopypasta = () => {
    const incrementCopypastaLikes = fetch(`http://localhost:8080/api/copypasta/incrementCopypastaLikes/${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setLikes(data.likes))
  
    const addPostToUserLikes = fetch(`http://localhost:8080/api/users/user/addPostToLikes?userId=${Cookies.get('user_id')}&postId=${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setLiked(data.success))

    Promise.all([
      incrementCopypastaLikes,
      addPostToUserLikes
    ])
    
  }

  const dislikeCopypasta = () => {
    const decrementCopypastaLikes = fetch(`http://localhost:8080/api/copypasta/decrementCopypastaLikes/${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setLikes(data.likes)
    })
  
    const removePostFromLikes = fetch(`http://localhost:8080/api/users/user/removePostFromLikes?userId=${Cookies.get('user_id')}&postId=${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setLiked(!data.success))

    Promise.all([
      decrementCopypastaLikes,
      removePostFromLikes
    ])

  }

  const handleLike = async () => {
    if(Cookies.get('user_id') === undefined) {
      navigate('/login')
      return
    }

    const isPostInUserLikes = await fetch(`http://localhost:8080/api/users/user/like?userId=${Cookies.get('user_id')}&postId=${props._id}`)
      .then(res => res.json())
    if(isPostInUserLikes.success) {
      dislikeCopypasta()
    } else {
      likeCopypasta()
    }
  }

  // TODO: add array for user's dislikes
  const handleDislike = async () => {
    if(Cookies.get('user_id') === undefined) {
      navigate('/login')
      return
    }
    const isPostInUserLikes = await fetch(`http://localhost:8080/api/users/user/like?userId=${Cookies.get('user_id')}&postId=${props._id}`)
    if(isPostInUserLikes.success) {
      likeCopypasta()
    } else {
      dislikeCopypasta()
    }
  }


  return (
    <div className="flex pl-0 my-3 shadow-md w-full md:w-1/2 md:mx-auto bg-white py-2">
        <div className={`flex flex-col items-center ml-3`}>
            <div className={`cursor-pointer ${liked ? 'text-green-700' : 'text-black'}`} onClick={handleLike}>
              <ThumbUpIcon />
            </div>
            {likes}
            <div className="cursor-pointer" onClick={handleDislike}>
              <ThumbDownIcon />
            </div>
        </div>
        <div className="flex flex-col ml-3 pr-5">
            <div className="text-gray-500">{author}</div>
            <span className="text-xl font-bold">{props.title}</span>
            <div>
                {props.content}
            </div>
        </div>
    </div>
  )
}

export default Card