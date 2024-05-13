import { Route, Routes, useLocation} from 'react-router'


import './App.css'
import Articles from './components/Articles'
import Header from './components/Header'
import SingleArticle from './components/SingleArticle'
import Login from './components/Login'
import Homepage from './components/Homepage'
import { useEffect, useState } from 'react'
import { useContext } from "react";

import { UserContext } from "./context/User";



function App() {

  const { user } = useContext(UserContext);

  console.log(user)

  const [prevUrl, setPrevUrl] = useState('/')
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      console.log('Hi')
      setPrevUrl('/articles')
    } else if (location.pathname !== '/login') {
      setPrevUrl(location.pathname)
    }
  }, [location])


  return (
    <>
      <Header />  
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:topic' element={<Articles />} />
        <Route path='/login' element={<Login prevUrl={prevUrl} />} />
        <Route path='/article/:article_id' element={<SingleArticle />} />

      </Routes>
      
    </>
  )
}

export default App
