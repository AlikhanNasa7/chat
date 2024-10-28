import React, {useContext, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import Topics from '../components/Topics';

const Home = () => {

    const {isAuthenticated} = useAuth();
    

    return (
      <div>
        <Topics />
      </div>
    )
}

export default Home