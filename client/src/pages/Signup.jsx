import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, Router, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [passVisible, setPasswordVisible] = useState(false)
  const signUpButtonref = useRef()
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const handleSignup = async e => {
    // disabling the sign up button till request is processing
    signUpButtonref.current.innerHTML = "Please wait..."
    signUpButtonref.current.disabled = true
    e.preventDefault();
    const formdata = new FormData(e.target);
    const payload = {}
    for (let key of formdata.keys()) {
      payload[key] = formdata.get(key)
    }
    const req = await fetch(`${import.meta.env.VITE_SERVER}/signup`, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }

    })
    const res = await req.json()
    signUpButtonref.current.innerHTML = "Sing up"
    signUpButtonref.current.disabled = false
    // warn on error
    if (res?.error) {
      setWarning(res?.message)
      setSuccess(null)
    }
    // inform on success
    if (!user?.error) {
      setSuccess(res?.message);
      setWarning(null)
    }

  }
  return (
    <section className='h-full w-full flex '>
      {
        user?.name && <Navigate to={"/"} />
      }
      {/* heading */}
      <section className='w-[40%] text-white bg-primary md:inline-block hidden h-full py-16'>
        <h1 className='font-black mx-auto w-[70%] text-6xl'>Welcome to Rsquare.</h1>
        <p className='py-6  w-[70%] mx-auto'>Lets get you all set to start up with your account and begin setting up your profile</p>
      </section>
      {/* form */}
      <section className='py-16 px-6 md:px-16 md:w-[60%]'>
        <h2 className='text-4xl font-bold'>Begin your jouney</h2>
        <p className='text-slate-500 font-medium py-4'>Get started with your best platform for design</p>
        {
          warning &&
          <p className='text-red-500 text-sm font-medium '>{warning}</p>
        }
        {
          success &&
          <div>
            <p className='text-green-500 text-sm font-medium '>{success}</p>
            <Link to={"/"} className="underline text-sm text-primary">Login here</Link>
          </div>
        }
        <form onSubmit={handleSignup} className='mx-auto mt-8  w-[90%] md:w-[70%] flex flex-col md:flex-row flex-wrap'>
          <div className='formGroup group'>
            <label htmlFor="fname" className='group-hover:text-primary text-sm font-medium w-20'>First Name*</label>
            <input required type="text" id='fname' name="fname" className='py-2 px-4 mt-1 border rounded-md flex-1 accent-primary focus:outline-primary' />
          </div>

          <div className='formGroup group'>
            <label htmlFor="lname" className='group-hover:text-primary text-sm font-medium'>Last Name*</label>
            <input required type="text" id='lname' name="lname" className='py-2 px-4 mt-1 border rounded-md flex-1 accent-primary focus:outline-primary' />
          </div>
          <div className='formGroup group'>
            <label htmlFor="email" className='group-hover:text-primary text-sm font-medium'>Email*</label>
            <input required type="text" id='email' name="email" className='py-2 px-4 mt-1 border rounded-md flex-1 accent-primary focus:outline-primary' />
          </div>
          <div className='formGroup group'>
            <label htmlFor="phone" className='group-hover:text-primary text-sm font-medium'>Phone*</label>
            <input required type="text" id='phone' name="phone" className='py-2 px-4 mt-1 border rounded-md flex-1 accent-primary focus:outline-primary' />
          </div>
          <div className='formGroup group'>
            <label htmlFor="pass" className='group-hover:text-primary text-sm font-medium'>Password*</label>
            <div className='relative min-w-[230px]'>
              <input required type={passVisible ? "text" : "password"} id='pass' name="password" className=' w-full py-2 px-4 mt-1 border rounded-md flex-1 pr-6 accent-primary focus:outline-primary' />
              <i className="fa-solid absolute right-2 fa-eye top-[50%] -translate-y-[30%] text-slate-500 cursor-pointer" onClick={() => setPasswordVisible(!passVisible)}></i>
            </div>
          </div>
          {/* agrrement  */}
          <span className='flex items-center mt-6 px-2'>
            <input required type="checkbox" name="aggreement" id="terms" className='w-4 h-4' />
            <label htmlFor='terms' className='mx-1 text-sm md:w-max cursor-pointer'>By sigining up, you agree to our <a href="/" className='text-primary font-medium'>User Agreement</a>,<a href="/" className='text-primary font-medium '>Terms of Service </a> & <a href="/" className='text-primary font-medium'>Privacy policy</a></label>
          </span>

          <div>

          </div>
          <button className='py-3 px-6 bg-primary mt-10 rounded-md text-white w-full md:w-[50%]' ref={signUpButtonref}>Sign up</button>
          <p className='w-full text-sm py-2'>Already have an account ? <Link to="/" className='text-primary'>Login</Link></p>
        </form>
      </section>
    </section>
  )
}

export default Signup