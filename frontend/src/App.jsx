import React from 'react'
import {  Routes, Route, Router } from 'react-router-dom';
import Start from './pages/Start';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Show from './pages/Show';
import Update from './pages/Update';
import PrivateRoute from "./component/PrivateRoute";
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Home' element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
        }/>
        
      <Route path='/show' element={
          <PrivateRoute>
            <Show/>
          </PrivateRoute>
          
        }/>
      <Route path='/update/:id' element={
        <PrivateRoute>
          <Update/>
        </PrivateRoute>   
        }/>
    </Routes>
    </>
  )
}

export default App