import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useAuth } from '../context/AuthContext';
import { FaHeart } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";

const Topbar = () => {
    const {isAuthenticated} = useAuth();
    
    return (
        <div className='flex w-full h-[100px] items-center text-base justify-between px-8'>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/home">Home</NavLink>
            </div>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/courses">Courses</NavLink>
            </div>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/about">About</NavLink>
            </div>
            <div className='px-4 w-[45%]'>
                <form className='flex w-full rounded-[25px] relative text-base'>
                    <input type='text' name='text' placeholder='Find courses' className='w-full h-full block rounded-[25px] border-[1px] border-stone-500 py-3 pr-10 pl-5'/>
                    <button type='submit' className='absolute top-0 right-3 h-full rounded-[25px] cursor-pointer border-0 bg-none'><FaSearch style={{color: 'grey'}}/></button>
                </form>
            </div>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/teach">Teach</NavLink>
            </div>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/interactions">Progress</NavLink>
            </div>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/popular">Popular</NavLink>
            </div>
            <div className='p-4 text-center max-w-44'>
                <NavLink to="/interactions">My Interactions</NavLink>
            </div>
            <div className='flex-1 flex items-center justify-around'>
                <NavLink to="cart"><RiShoppingCart2Line style={{width: '22px', height: '22px'}}/></NavLink>
                {isAuthenticated && (
                    <>
                        <div className='p-4 text-center max-w-44'>
                            <NavLink to="/login">Log In</NavLink>
                        </div>
                        <div className='p-4 text-center max-w-44'>
                            <NavLink to="/register">Register</NavLink>
                        </div>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <NavLink to="favourites"><FaHeart style={{margin: 4, width: '20px', height: '20px'}}/></NavLink>
                        <NavLink to="notifications"><IoNotifications style={{margin: 4, width: '22px', height: '22px'}}/></NavLink>
                    </>
                )}
            </div>
        </div>
    )
}

export default Topbar