import { useState } from "react"
import Navbar from "../components/Navbar"

const CreatePostPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const postCopypasta = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col m-10">
                <h1 className="text-3xl">Post Your Copypasta</h1>
                <form className="flex flex-col mt-7">
                    <label className="text-lg font-bold" htmlFor="title">Title</label>
                    <input 
                        id="title"
                        type="text"
                        className="indent-1 border-2"
                        placeholder="Your Cool Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="text-lg font-bold" htmlFor="content">Content</label>
                    <textarea
                        rows="13"
                        className="border-2 resize-none indent-1" 
                        placeholder="Your Super Duper Cool Copypasta"
                     />
                     <button className="border-2 p-2 mt-3 cursor-pointer" onClick={postCopypasta}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePostPage