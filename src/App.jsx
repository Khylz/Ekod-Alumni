import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import CreateJobOffer from './pages/CreateJobOffer'
import OfferList from './pages/OfferList'
import Header from './pages/header'
import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './firebase/firebase.service'
import 'bootstrap/dist/css/bootstrap.min.css'
import Profile from './pages/Profile'
import Dashboard from './pages/dashboard';
import UserList from './pages/userlist'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Bienvenue sur Ekod Alumni'

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsLoggedIn(false)
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error)
    }
  }

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="min-h-screen flex flex-col items-start bg-gray-50">
        <div className="welcome-text">
          <h1>{displayText}|</h1>
        </div>
        <div className="animation-container">
          <div className="animation"></div>
        </div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/createJobOffer" element={<CreateJobOffer />} />
          <Route path="/offerList" element={<OfferList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App