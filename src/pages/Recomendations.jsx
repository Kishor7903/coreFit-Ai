import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import loader from '../assets/loader_elephant.gif'
import DietSearch from '../components/DietSearch'
import ExcerciseSearch from '../components/ExerciseSearch'

function Recomendations() {
   
   
  return (
    
    <div className='w-full min-h-screen relative flex flex-col items-center mt-24 gap-10'>
        <DietSearch />
        <ExcerciseSearch />
    </div>
  )
}

export default Recomendations