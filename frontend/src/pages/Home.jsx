import React from 'react'
import { Link } from 'react-router-dom'
import { renderMatches } from 'react-router-dom'
const Home = () => {
  return (
    <div>
    <Link to="/login"><button>login</button></Link>    
    <h1>home</h1>
    </div>
  )
}

export default Home
