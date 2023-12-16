import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/user.slice";

const Login = () => {
  const dispatch = useDispatch();
  const loginButtonRef = useRef();
  const [passVisible, setPasswordVisible] = useState(false);
  const [warning, setWarning] = useState(null);
  const hadleLogin = async (e) => {
    loginButtonRef.current.innerHTML = "Please wait...";
    loginButtonRef.current.disabled = true;
    e.preventDefault();
    const formdata = new FormData(e.target);
    const payload = {};
    for (let key of formdata.keys()) {
      payload[key] = formdata.get(key);
    }
    const req = await fetch(`${import.meta.env.VITE_SERVER}/login`, {
      method: "post",
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await req.json();
    if (res.error) {
      setWarning(res.message);
    }
    if (!res.error) {
      setWarning(null);
      dispatch(setUser({ ...res?.user, name: res?.user?.fname }));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res?.user,
          name: res?.user?.fname + " " + res?.user?.lname,
        })
      );
    }
    loginButtonRef.current.innerHTML = "Login";
    loginButtonRef.current.disabled = false;
  };
  return (
    <section className="h-full w-full flex ">
      {/* heading */}
      <section className="md:w-[40%] text-white bg-primary md:inline-block hidden h-full px-8 py-16">
        <h1 className="font-black mx-auto text-6xl">Welcome to Gallery.</h1>
        <p className="py-6 mx-auto">
          Lets get you all set to start up with your account and begin setting
          up your profile
        </p>
      </section>
      {/* form */}
      <section className="py-16 px-6 sm:px-12 w-full mx-auto md:w-[60%]">
        <h2 className="text-4xl font-bold">Welcome back</h2>
        <p className="text-slate-500 font-medium py-4">
          Please enter your details
        </p>
        <form onSubmit={hadleLogin} className="w-full space-y-6 max-w-md mx-auto sm:ml-0 sm:max-h-fit">
          {warning && (
            <p className="text-red-500 p-2 bg-red-100 rounded-md text-sm font-medium ">
              {warning}
            </p>
          )}
          <div className="">
            <label htmlFor="fname" className="block">
              Email Address
            </label>
            <input
              type="text"
              id="fname"
              required
              name="email"
              className="w-full py-2 px-4 mt-1 border rounded-md accent-primary focus:outline-primary"
            />
          </div>

          <div>
            <label htmlFor="pass">Password</label>

            <input
              required
              type={passVisible ? "text" : "password"}
              id="pass"
              name="password"
              className="w-full py-2 px-4 mt-1 border rounded-md flex-1 pr-6 accent-primary focus:outline-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full flex-row items-center justify-between">
            <span className="flex items-start  px-2">
              <input
                type="checkbox"
                name="aggreement"
                id="terms"
                className="w-5 h-5 accent-primary select-none"
              />
              <label htmlFor="terms" className="mx-1 text-sm md:w-max">
                Remember me
              </label>
            </span>
            <Link to="forgot" className="text-primary text-sm px-2">
              Forgot password ?{" "}
            </Link>
          </div>
          <button
            className="py-2 px-6 bg-primary mt-10 rounded-md text-white w-full  md:w-[50%]"
            ref={loginButtonRef}
          >
            Login
          </button>
          <p className="w-full text-sm py-2">
            Create new account ?{" "}
            <Link to="/signup" className="text-primary">
              Signup
            </Link>
          </p>
        </form>
      </section>
    </section>
  );
};

export default Login;
