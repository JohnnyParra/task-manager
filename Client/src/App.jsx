import React from 'react'

// Libraries
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"

// Pages
import Home from './pages/HomePage/HomePage'
import Login from './pages/LoginPage/LoginPage'
import SignUp from './pages/SignUpPage/SignUp'
import Profile from './pages/ProfilePage/ProfilePage'
import PrivateRoutes from './utils/PrivateRoutes'

//Styling
import './index.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<SignUp />} />
        <Route path = "/login" element = {<Login />} />
        <Route element={ <PrivateRoutes/>}>
          <Route path = "/task-manager" element = {<Home/>}/>
            <Route path="/task-manager/profile" element = {<Profile />} />
        </Route> 
      </Routes>
    </Router>
  )
}

