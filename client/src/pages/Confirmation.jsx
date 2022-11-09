import React from 'react'
import { Link } from 'react-router-dom'

const Confirmation = () => {
  return (
    <div className="error w-full h-full flex flex-col bg-white justify-center items-center ">
      <div className="404 flex space-x-2 items-center">

        <img src="/verified.webp" alt="" className='w-36 md:w-60' />

      </div>
      <p className="message text-xl text-center text-green-600">Great, your account is verified , you can login now!!!</p>
      <Link to={"/"} className='bg-primary px-4 py-2 mt-8 rounded text-white flex space-x-2 items-center'><i className="fa-solid fa-arrow-left-long" /><span>Go to login</span></Link>
    </div>
  )
}

export default Confirmation