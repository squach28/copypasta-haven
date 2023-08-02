import { useReducer, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import { postReducer } from "../reducers/PostReducer"
import ErrorIcon from '@mui/icons-material/Error'
import Cookies from "js-cookie"
import { addCopypasta } from "../api/copypasta"

const CreatePostPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const initialErrors = [
        {
            name: 'title',
            status: false,
            message: ''
        },
        {
            name: 'content',
            status: false,
            message: ''
        }
    ]

    const [errors, dispatch] = useReducer(postReducer, initialErrors)
    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        if(e.target.value === '') {
            dispatch({ type: 'TITLE_EMPTY' })
        } else {
            dispatch({ type: 'TITLE_NOT_EMPTY'})
        }
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        if(e.target.value === '') {
            dispatch({ type: 'CONTENT_EMPTY' })
        } else {
            dispatch({ type: 'CONTENT_NOT_EMPTY'})
        }
        setContent(e.target.value)
    }

    const postCopypasta = (e) => {
        e.preventDefault()
        setLoading(true)
        const post = {
            title: title,
            content: content,
            author: Cookies.get('user_id')
        }

        addCopypasta(post)
            .then(data => {
                if(data) {
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const renderErrorMessage = (errorName) => {
        let element = null
        errors.map(err => {
            if(err.name === errorName && err.status) {
                element = <div className="text-red-600 font-bold flex items-center justify-end gap-2" key={err.name}><ErrorIcon />{err.message}</div>
            } 
            return null
        })

        return element
    }

    const errorsPresent = () => {
        const isErrorPresent = errors.find(err => err.status)

        return isErrorPresent
    }

    const inputsEmpty = () => {
        return title === '' || content === ''
    }

    return (
        <div className="w-full h-screen bg-slate-200">
            <Navbar />
            <div className={`flex flex-col m-10 md:w-1/2 md:mx-auto ${loading ? '' : ''}`}>
                <h1 className="text-3xl">Post Your Copypasta</h1>
                <form className="flex flex-col mt-7">
                    <label className="text-lg font-bold" htmlFor="title">Title</label>
                    <input 
                        id="title"
                        type="text"
                        className="indent-1 border-2 p-1"
                        placeholder="Your Cool Title"
                        onChange={handleTitleChange}
                    />
                    {renderErrorMessage('title')}
                    <label className="text-lg font-bold" htmlFor="content">Content</label>
                    <textarea
                        rows="13"
                        wrap="hard"
                        className="border-2 resize-none p-1 whitespace-pre-line" 
                        placeholder="Your Super Duper Cool Copypasta"
                        onChange={handleContentChange}
                     />
                     {renderErrorMessage('content')}
                     <button disabled={loading || errorsPresent() || inputsEmpty()} className={`mt-5 px-2 py-3 font-bold rounded-md hover:bg-green-700 ${loading ? 'bg-green-200' : 'bg-green-500'} disabled:opacity-50`} onClick={postCopypasta}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePostPage