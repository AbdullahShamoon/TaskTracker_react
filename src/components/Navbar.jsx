import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-blue-900 p-2'>
        <div className="logo flex items-center">
            <img src="src/logo.png" className="w-8 rounded-full mr-1"  />
            <span className='text-white font-bold'>TaskTracker</span>   
        </div>
    </nav>
  )
}

export default Navbar