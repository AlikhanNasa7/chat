import React, {useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {useFormik} from 'formik'
const AuthForm = ({isRegister}) => {

  const [isFetching, setIsFetching] = useState(false);

  const {isAuthenticated, login, logout, register, user, authTokens} = useAuth();

  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      const {email, password} = values;
      const res = await login(email, password);
      console.log(res);
      if (res.status === 200){
        navigate("/chat-home");
      }
    }
  });



  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let response = await login(e.target.email.value, e.target.password.value);
    if (response.status===200){
      navigate('/');
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    let userData = {'email': e.target.email.value, 'first_name': e.target.firstName.value, 'last_name':e.target.lastName.value, 'username': e.target.username.value,'password': e.target.password1.value}

    let response = await register(userData);
    if (response.status === 200){
      navigate('/login');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0" onSubmit={isRegister ? handleRegisterSubmit : formik.handleSubmit}>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {isRegister ? "Sign up" : "Log in"} to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input value={formik.values.email} onChange={formik.handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value={formik.values.password} onChange={formik.handleChange} type="password" name={isRegister ? "password1" : "password"} id={isRegister ? "password1" : "password"} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {isRegister && (
                    <>
                      <div>
                          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                          <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                      </div>
                      <div>
                          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                          <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                      </div>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                          <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      </div>
                    </>
                  )}
                  {!isRegister && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <Link to="/forgot-password"><p className="text-sm font-medium text-sky-600 hover:underline dark:text-primary-500">Forgot password?</p></Link>
                    </div>
                  )}
              
                  <button type="submit" className="w-full text-white bg-sky-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isRegister ? "Sign up" : "Log in"}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <NavLink to={!isRegister ? "/register" : "/login"}><span className="font-medium text-sky-600 hover:underline dark:text-primary-500">{!isRegister ? "Sign up" : "Log in"}</span></NavLink>
                  </p>
              </form>
          </div>
      </div>
    </div>
  )
}

export default AuthForm;