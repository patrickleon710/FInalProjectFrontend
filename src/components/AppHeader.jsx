import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons' 
import { Link, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AppHeader = () => {
 
  const {username} = useAuth()
  const { userId } = useParams()

  return (
    <header className='app-header'>
        <Link to={`/app/${username}`} className='app-arrow'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 className='app-heading'>myJournal</h1>
    </header>
  )
}

export default AppHeader