import React from 'react'
import AdminSidebar from '../AdminDashboard/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout2 = () => {
  return (
    <div className='flex h-screen'>
          <AdminSidebar />
     <Outlet />
    </div>
  )
}

export default Layout2