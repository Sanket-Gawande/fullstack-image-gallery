import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setUser } from '../redux/user.slice'
import Error from './pages/Error'
import Confirmation from './pages/Confirmation'
function App() {
  const [count, setCount] = useState(0)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      dispatch(setUser(u))

    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user?.name ? <Home /> : <Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verification-status' element={<Confirmation />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
