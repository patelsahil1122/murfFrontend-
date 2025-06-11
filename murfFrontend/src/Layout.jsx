import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left sidebar - you can add navigation here later */}
      <div className="w-1/4 bg-white shadow-lg">
        {/* Sidebar content */}
      </div>
      
      {/* Main content area */}
      <div className="w-3/4 flex justify-center items-center p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout