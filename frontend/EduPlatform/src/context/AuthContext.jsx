import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') ? true : false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    const login = async (email, password) => {
        const username = email;
        let response = await axios.post('http://127.0.0.1:8000/api/token/',{
            'email':email, 'password': password
        }, {withCredentials: true}
        );

        console.log(response)

        const data = await response.data;
        if (response.status===200){
            setUserId(data.user_id);
            localStorage.setItem("isLoggedIn", "true");
            setIsAuthenticated(true);
            console.log(data);
        }else{
            alert('Something went wrong')
        }
        return {'status':response.status, data};
    }
    const register = async (userData) => {

        let response = await fetch('http://127.0.0.1:8000/api/auth_mine/register/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();

        return {'status':response.status, data};
    }

    const logout = async () => {
        //User logout logic -> removing all the data we had about the user before      
        setIsAuthenticated(false);
        setUserId(null);
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");

        try {
            await axios.post(
                `${BASE_URL}/logout/`, {}, {withCredentials: true}
            )
        } catch (logoutError){
            return Promise.reject(logoutError);
        }
    }

    let updateToken = async () => {
        let response = await axios.post('http://127.0.0.1:8000/api/token/refresh/',
            {},
            {withCredentials: true}
        );
        const data = response.data;

        if (response.status===200){
            console.log(data);
            setUserId(data.user_id);
        }else{
            logout();
        }

        return {'status':response.status, data};
    }


    const refreshAccessToken = async () => {
        let response = await axios.post('http://127.0.0.1:8000/api/token/refresh/',
            {},
            {withCredentials: true}
        );
    }


    useEffect(()=>{
        let fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(()=>{
            if (authTokens){
                updateToken();
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <AuthContext.Provider value={{login, logout, register, isAuthenticated, userId, updateToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
