import './App.css'
import useSWR from 'swr'
import Card from './components/Card'
import Navbar from './components/Navbar'
import { fetcher } from './api/fetcher'
import { useState } from 'react'
import OverlayMenu from './components/OverlayMenu'

function App() {
  const [showMenu, setShowMenu] = useState(false)
  const { data, err, isLoading } = useSWR('http://localhost:8080/api/copypasta/all', fetcher)

  const toggleOverlay = () => {
    setShowMenu(show => !show)
  }


  return (
    <div className="w-full h-full bg-slate-200">
      <Navbar toggleOverlay={toggleOverlay}/>
      {showMenu ? <OverlayMenu /> : null }
      {isLoading ? 'Loading...' : null}
      {data ?
        data.map(copypasta => <Card key={copypasta._id} {...copypasta}/>)
      : null}
      {err ? 'Something went wrong, try again later.' : null}
    </div>
    )
}

export default App
