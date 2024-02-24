import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GeneratedForm from '../GeneratedForm'
import Fieldcreate from '../Fieldcreate'
import Admin from '../AdinPanel/Admin'

const Routecomp = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Fieldcreate/>}/>
            <Route path='/gereratedform' element={<GeneratedForm/>}/>
            <Route path='/admin' element={<Admin/>} />
        </Routes>
    </div>
  )
}

export default Routecomp