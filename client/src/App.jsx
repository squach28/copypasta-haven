import './App.css'
import useSWR from 'swr'
import Card from './components/Card'
import Navbar from './components/Navbar'
import { fetcher } from './api/fetcher'

function App() {
  const { data, err, isLoading } = useSWR('http://localhost:8080/api/copypasta/all', fetcher)

  return (
    <div className="w-full h-full bg-slate-200">
      <Navbar />
      {isLoading ? 'Loading...' : null}
      {data ?
        data.map(copypasta => <Card key={copypasta._id} {...copypasta}/>)
      : null}
      {err ? 'Something went wrong, try again later.' : null}
    </div>
    )
}

export default App
