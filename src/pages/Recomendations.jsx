import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import loader from '../assets/loader_elephant.gif'
import DietSearch from '../components/DietSearch'

function Recomendations() {
   
   
  return (
    
    <div className='w-full h-screen relative'>
      <DietSearch></DietSearch>
        
    </div>
  )
}

export default Recomendations