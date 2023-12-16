import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Router, useNavigate } from "react-router-dom";

const Signup = () => {
  const [passVisible, setPasswordVisible] = useState(false);
  const signUpButtonref = useRef();
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    // disabling the sign up button till request is processing
    signUpButtonref.current.innerHTML = "Please wait...";
    signUpButtonref.current.disabled = true;
    e.preventDefault();
    const formdata = new FormData(e.target);
    const payload = {};
    for (let key of formdata.keys()) {
      payload[key] = formdata.get(key);
    }
    const req = await fetch(`${import.meta.env.VITE_SERVER}/signup`, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    signUpButtonref.current.innerHTML = "Sing up";
    signUpButtonref.current.disabled = false;
    // warn on error
    if (res?.error) {
      setWarning(res?.message);
      setSuccess(null);
    }
    // inform on success
    if (!user?.error) {
      setSuccess(res?.message);
      setWarning(null);
    }
  };
  return (
    <section className="h-full w-full flex">
      {user?.name && <Navigate to={"/"} />}
      {/* heading */}
      <section className="md:w-[40%] text-white bg-primary md:inline-block hidden h-full px-8 py-16">
        <h1 className="font-black mx-auto text-6xl">Welcome to Gallery.</h1>
        <p className="py-6 mx-auto">
          Lets get you all set to start up with your account and begin setting
          up your profile
        </p>
      </section>
      {/* form */}
      <section className="py-16 mx-auto  w-full px-6 h-fit md:px-16 md:w-[60%] ">
        <h2 className="text-4xl font-bold">Begin your jouney</h2>
        <p className="text-slate-500 font-medium py-4">
          Get started with your best platform for design
        </p>

        <form
          onSubmit={handleSignup}
          className="mx-auto flex flex-col gap-4"
        >
          {warning && (
            <p className="text-red-500 py-2 px-2 mb-2 rounded-md text-sm font-medium w-full bg-red-100">
              {warning}
            </p>
          )}
          {success && (
            <div>
              <p className="text-green-600 p-2 rounded-md bg-green-100 text-sm font-medium ">
                {success}
              </p>
              <Link to={"/"} className="underline text-sm text-primary">
                Login here
              </Link>
            </div>
          )}
          <section className="flex flex-col md:flex-row w-full gap-4">
            <div className="group flex-1">
              <label
                htmlFor="fname"
                className="group-hover:text-primary text-sm font-medium w-20"
              >
                First Name*
              </label>
              <input
                required
                type="text"
                id="fname"
                name="fname"
                className="py-2 px-4 mt-1 border rounded-md flex-1 w-full accent-primary focus:outline-primary"
              />
            </div>
            <div className="group flex-1">
              <label
                htmlFor="lname"
                className="group-hover:text-primary text-sm font-medium"
              >
                Last Name*
              </label>
              <input
                required
                type="text"
                id="lname"
                name="lname"
                className="py-2 px-4 mt-1 border w-full rounded-md flex-1 accent-primary focus:outline-primary"
              />
            </div>
          </section>
          <section className="flex flex-col md:flex-row w-full gap-4">
            <div className="group w-full md:w-1/2">
              <label
                htmlFor="email"
                className="group-hover:text-primary text-sm font-medium"
              >
                Email*
              </label>
              <input
                required
                type="text"
                id="email"
                name="email"
                className="py-2 px-4 mt-1 border w-full rounded-md flex-1 accent-primary focus:outline-primary"
              />
            </div>
            <div className="group w-full md:w-1/2">
              <label
                htmlFor="phone"
                className="group-hover:text-primary text-sm font-medium"
              >
                Phone*
              </label>
              <input
                pattern="[0-9]{10}"
                required
                type="text"
                id="phone"
                name="phone"
                className="py-2 w-full px-4 mt-1 border rounded-md flex-1 accent-primary focus:outline-primary"
              />
            </div>
          </section>
          <section className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex-1 max-w-md">
              <label
                htmlFor="pass"
                className="group-hover:text-primary text-sm font-medium"
              >
                Password*
              </label>
              <div className="relative min-w-[230px] w-full">
                <input
                  required
                  type={passVisible ? "text" : "password"}
                  id="pass"
                  name="password"
                  className=" w-full py-2 px-4 mt-1 border rounded-md flex-1 pr-6 accent-primary focus:outline-primary"
                />
                <i
                  className="fa-solid absolute right-2 fa-eye top-[50%] -translate-y-[30%] text-slate-500 w- cursor-pointer"
                  onClick={() => setPasswordVisible(!passVisible)}
                ></i>
              </div>
            </div>
          </section>
          <section className="">
            {/* agrrement  */}
            <span className="flex select-none items-start gap-1">
              <input
                required
                type="checkbox"
                name="aggreement"
                id="terms"
                className="w-5 h-5 accent-primary"
              />
              <label
                htmlFor="terms"
                className="mx-1 text-sm md:w-max cursor-pointer"
              >
                By sigining up, you agree to our{" "}
                <a href="/" className="text-primary font-medium">
                  User Agreement
                </a>
                ,
                <a href="/" className="text-primary font-medium ">
                  Terms of Service{" "}
                </a>{" "}
                &{" "}
                <a href="/" className="text-primary font-medium">
                  Privacy policy
                </a>
              </label>
            </span>

            <button
              className="py-2 px-6 bg-primary mt-10 rounded-md text-white w-full md:w-[50%]"
              ref={signUpButtonref}
            >
              Sign up
            </button>
            <p className="w-full text-sm py-2">
              Already have an account ?{" "}
              <Link to="/" className="text-primary">
                Login
              </Link>
            </p>
          </section>
        </form>
      </section>
    </section>
  );
};

export default Signup;
