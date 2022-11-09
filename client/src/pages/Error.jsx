import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error w-screen h-screen flex flex-col justify-center items-center space-y-6">
      <div className="404 flex space-x-2 items-center">
        <span className='text-[15rem] font-semibold'>4</span>
        <img src="/error.png" alt="" className='w-52'/>
        <span className='text-[15rem] font-semibold'>4</span>
      </div>
      <p className="message text-xl text-center">oops! looks like you are lost. <br />
        The page you are looking for could not be found.</p>
      <Link to={"/"} className='bg-primary px-4 py-2 rounded text-white flex space-x-2 items-center'><i className="fa-solid fa-arrow-left-long"/><span>Back To Home</span></Link>
    </div>
  )
}

export default Error