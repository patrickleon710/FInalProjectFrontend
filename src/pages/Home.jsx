import React from 'react'
import { Link, useParams } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import LogoutButton from '../components/LogoutButton'

const Home = () => {

  console.log('Home')
  
  const {userName} = useParams()
  
  return (
    <div>
        <div className="home-links">
          <Link to='entries' className='home-nav__links'>Entries</Link>
          <Link to='entries/new' className='home-nav__links'>Create New Entry</Link>
          <Link to='info' className='home-nav__links'>Info</Link>
          <LogoutButton />
        </div>
        <div>
            <h1 className='home-heading'>Welcome {userName}</h1>
        </div>

    </div>
  )
}

export default Home