import React from 'react'
import { Outlet } from 'react-router-dom'

import AppHeader from './AppHeader'

const AppLayout = () => {
  return (
    <div>
        <AppHeader />
        <div className="app-container">
            <Outlet />
        </div>
    </div>
  )
}

export default AppLayout