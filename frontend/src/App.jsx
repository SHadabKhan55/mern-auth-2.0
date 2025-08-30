import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import OTPvarify from './pages/OTPvarify'
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>      
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "/login",
      element:<Login/>      
    },
    {
      path: "/otp-varify",
      element:<OTPvarify/>      
    },
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App