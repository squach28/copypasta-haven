/* eslint-disable react/prop-types */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addCopypastaToUserDislikes, addCopypastaToUserLikes, decrementCopypastaLikes, getUsernameForCopypasta, incrementCopypastaLikes, isCopypastaDislikedByUser, isCopypastaLikedByUser, removeCopypastaFromUserDislikes, removeCopypastaFromUserLikes } from '../api/copypasta';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Card = (props) => {
  const [author, setAuthor] = useState(null)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(props.likes)
  const [copied, setCopied] = useState(false)
  const createdAt = new Date(props.createdAt)

  useEffect(() => {
    getUsernameForCopypasta(props.author)
      .then(data => setAuthor(data))

    isCopypastaLikedByUser(Cookies.get('user_id'), props._id)
      .then(data => setLiked(data.success))

    isCopypastaDislikedByUser(Cookies.get('user_id'), props._id)
      .then(data => setDisliked(data.success))
  
  }, [])
  const navigate = useNavigate()

  const likeCopypasta = () => {
    const incrementLikes = incrementCopypastaLikes(props._id)
      .then(data => setLikes(data.likes))

    const addCopypasta = addCopypastaToUserLikes(Cookies.get('user_id'), props._id)
      .then(data => setLiked(data.success))

    const removeCopypasta  = removeCopypastaFromUserDislikes(Cookies.get('user_id'), props._id)
      .then(data => setDisliked(!data.success))

    Promise.all([
      incrementLikes,
      addCopypasta,
      removeCopypasta
    ])
  }

  const undoLikeCopypasta = () => {
    const decrementLikes = decrementCopypastaLikes(props._id)
      .then(data => setLikes(data.likes))
    const removeCopypasta  = removeCopypastaFromUserLikes(Cookies.get('user_id'), props._id)
      .then(data => setLiked(!data.success))

    Promise.all([
      decrementLikes,
      removeCopypasta
    ])
  }

  const dislikeCopypasta = () => {
    const decrementLikes = decrementCopypastaLikes(props._id)
      .then(data => setLikes(data.likes))

    const addCopypasta = addCopypastaToUserDislikes(Cookies.get('user_id'), props._id)
      .then(data => setDisliked(data.success))

    const removeCopypasta  = removeCopypastaFromUserLikes(Cookies.get('user_id'), props._id)
      .then(data => setLiked(!data.success))

    Promise.all([
      decrementLikes,
      addCopypasta,
      removeCopypasta
    ])
  }

  const undoDislikeCopypasta = () => {
    const incrementLikes = incrementCopypastaLikes(props._id)
      .then(data => setLikes(data.likes))
    const removeCopypasta  = removeCopypastaFromUserDislikes(Cookies.get('user_id'), props._id)
      .then(data => setDisliked(!data.success))
  
    Promise.all([
      incrementLikes,
      removeCopypasta
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
      undoLikeCopypasta()
    } else {
      likeCopypasta()
    }
  }

  const handleDislike = async () => {
    if(Cookies.get('user_id') === undefined) {
      navigate('/login')
      return
    }

    const isPostInUserDislikes = await fetch(`http://localhost:8080/api/users/user/dislike?userId=${Cookies.get('user_id')}&postId=${props._id}`)
      .then(res => res.json())
    if(isPostInUserDislikes.success) {
      undoDislikeCopypasta()
    } else {
      dislikeCopypasta()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.content)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)

  }

// content goes off screen
  return (
    <div className="flex pl-0 my-3 shadow-md w-full md:w-1/2 md:mx-auto bg-white py-2">
        <div className={`flex flex-col items-center ml-3`}>
            <div className={`cursor-pointer ${liked ? 'text-green-700' : 'text-black'}`} onClick={handleLike}>
              <ThumbUpIcon />
            </div>
            {likes}
            <div className={`cursor-pointer ${disliked ? 'text-red-700' : 'text-black'}`} onClick={handleDislike}>
              <ThumbDownIcon />
            </div>
        </div>
        <div className="flex flex-col ml-3 pr-5 flex-wrap overflow-x-auto">
            <div className="flex justify-between">
              <div className="text-gray-500">{author} - {createdAt.getMonth()}/{createdAt.getDate()}/{createdAt.getFullYear()}</div>
              <div className="cursor-pointer" onClick={copyToClipboard}>
                {copied ? <p>Copied!</p> : <ContentCopyIcon />}
              </div>
            </div>
            <span className="text-xl font-bold">{props.title}</span>
            
            <div className="break-words text-ellipsis max-w-max">
                {props.content}
            </div>
        </div>
    </div>
  )
}

export default Card