import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GeneratedForm from '../GeneratedForm'
import Fieldcreate from '../Fieldcreate'
import Admin from '../AdinPanel/Admin'
import SignUp from '../AdinPanel/Auth/Register'
import SignIn from '../AdinPanel/Auth/Login'

const Routecomp = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Fieldcreate/>}/>
            <Route path='/gereratedform' element={<GeneratedForm/>}/>
            <Route path='/admin' element={<Admin/>} />
            <Route path='/register' element={<SignUp/>} />
            <Route path='/login' element={<SignIn/>} />
        </Routes>
    </div>
  )
}

export default Routecomp