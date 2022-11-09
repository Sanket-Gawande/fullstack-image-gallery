import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error w-full h-full flex flex-col justify-center items-center ">
      <div className="404 flex space-x-2 items-center">
        <span className='md:text-[15rem] text-[8rem] sm:text-[10rem] font-semibold'>4</span>
        <img src="/error.png" alt="" className='w-36 md:w-52'/>
        <span className='md:text-[15rem] text-[8rem] sm:text-[10rem] font-semibold'>4</span>
      </div>
      <p className="message px-4 text-xl text-center">oops! looks like you are lost. <br />
        The page you are looking for could not be found.</p>
      <Link to={"/"} className='bg-primary px-4 py-2 mt-8 rounded text-white flex space-x-2 items-center'><i className="fa-solid fa-arrow-left-long"/><span>Back To Home</span></Link>
    </div>
  )
}

export default Error