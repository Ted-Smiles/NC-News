import { Route, Routes } from 'react-router'

import './App.css'
import Articles from './components/Articles'
import Header from './components/Header'
import SingleArticle from './components/SingleArticle'
import Login from './components/Login'


function App() {

  return (
    <>
      <Header />  
      <Routes>

        <Route path='/' element={<Articles />} />
        <Route path='/login' element={<Login />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />

      </Routes>
      
    </>
  )
}

export default App
