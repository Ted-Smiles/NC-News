import { Route, Routes, useLocation} from 'react-router'


import './App.css'
import Header from './components/Header'
import SingleArticle from './components/SingleArticle'
import Login from './components/Login'
import Homepage from './components/Homepage'
import { useContext } from "react";

import { UserContext } from "./context/User";



function App() {

  const { user } = useContext(UserContext);


  return (
    <>
      <Header />  
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/:topic' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/article/:article_id' element={<SingleArticle />} />

      </Routes>
      
    </>
  )
}

export default App
