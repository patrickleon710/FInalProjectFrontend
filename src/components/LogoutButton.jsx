import React, { useEffect } from 'react'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {

    const navigate = useNavigate()
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])





  return (
    <div>
        <button className='home-nav__links' onClick={sendLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton