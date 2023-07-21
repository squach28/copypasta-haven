/* eslint-disable react/prop-types */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Card = (props) => {
  return (
    <div className="flex pl-0 my-3 shadow-md w-full bg-white py-2">
        <div className="flex flex-col items-center ml-3">
            <ThumbUpIcon />
            {props.likes - props.dislikes}
            <ThumbDownIcon />
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