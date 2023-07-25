import { useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

const CreatePostPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const postCopypasta = (e) => {
        e.preventDefault()
        console.log('posting!')
        const post = {
            title: title,
            content: content
        }
        fetch('http://localhost:8080/api/copypasta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                navigate('/')
            }
        })
    }

    return (
        <div className="w-full">
            <Navbar />
            <div className="flex flex-col m-10 md:w-1/2 md:mx-auto">
                <h1 className="text-3xl">Post Your Copypasta</h1>
                <form className="flex flex-col mt-7">
                    <label className="text-lg font-bold" htmlFor="title">Title</label>
                    <input 
                        id="title"
                        type="text"
                        className="indent-1 border-2 p-1"
                        placeholder="Your Cool Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="text-lg font-bold" htmlFor="content">Content</label>
                    <textarea
                        rows="13"
                        className="border-2 resize-none p-1" 
                        placeholder="Your Super Duper Cool Copypasta"
                        onChange={(e) => setContent(e.target.value)}
                     />
                     <button className="border-2 p-2 mt-3 cursor-pointer" onClick={postCopypasta}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePostPage