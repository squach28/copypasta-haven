import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import LikesPage from './pages/LikesPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/createPost',
    element: <CreatePostPage />
  },
  {
    path: '/:id/likes',
    element: <LikesPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
