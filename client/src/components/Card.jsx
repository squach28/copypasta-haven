/* eslint-disable react/prop-types */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Card = (props) => {

  const handleLike = () => {
    // update on user 
    // update on table
    fetch(`http://localhost:8080/api/copypasta/incrementCopypastaLikes/${props._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const handleDislike = () => {

  }

  return (
    <div className="flex pl-0 my-3 shadow-md w-full md:w-1/2 md:mx-auto bg-white py-2">
        <div className="flex flex-col items-center ml-3">
            <div className="cursor-pointer" onClick={handleLike}>
              <ThumbUpIcon />
            </div>
            {props.likes - props.dislikes}
            <div className="cursor-pointer" onClick={handleDislike}>
              <ThumbDownIcon />
            </div>
        </div>
        <div className="flex flex-col ml-3 pr-5">
            <span className="text-xl font-bold">{props.title}</span>
            <div>
                {props.content}
            </div>
        </div>
    </div>
  )
}

export default Card