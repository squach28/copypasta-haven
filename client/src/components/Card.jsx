/* eslint-disable react/prop-types */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Card = (props) => {

  const [author, setAuthor] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/user/username/${props.author}`)
      .then(res => res.json())
      .then(data => setAuthor(data))
  
  }, [])
  const navigate = useNavigate()

  const handleLike = () => {
    if(Cookies.get('user_id') === undefined) {
      navigate('/login')
      return
    }
    const incrementCopypastaLikes = fetch(`http://localhost:8080/api/copypasta/incrementCopypastaLikes/${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const addPostToUserLikes = fetch(`http://localhost:8080/api/users/user/addPostToLikes?userId=${Cookies.get('user_id')}&postId=${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    Promise.all([
      incrementCopypastaLikes,
      addPostToUserLikes
    ])
    
  }



  const handleDislike = () => {
    if(Cookies.get('user_id') === undefined) {
      navigate('/login')
      return
    }
    const decrementCopypastaLikes = fetch(`http://localhost:8080/api/copypasta/decrementCopypastaLikes/${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const removePostFromLikes = fetch(`http://localhost:8080/api/users/user/addPostToLikes?userId=${Cookies.get('user_id')}&postId=${props._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    Promise.all([
      decrementCopypastaLikes,
      removePostFromLikes
    ])
  }


  return (
    <div className="flex pl-0 my-3 shadow-md w-full md:w-1/2 md:mx-auto bg-white py-2">
        <div className={`flex flex-col items-center ml-3`}>
            <div className="cursor-pointer" onClick={handleLike}>
              <ThumbUpIcon />
            </div>
            {props.likes - props.dislikes}
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