import { Route, Routes } from 'react-router'

import './App.css'
import Articles from './components/Articles'
import Header from './components/Header'
import SingleArticle from './components/SingleArticle'


function App() {

  return (
    <>
      <Header />  
      <Routes>

        <Route path='/' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
      </Routes>
      
    </>
  )
}

export default App
