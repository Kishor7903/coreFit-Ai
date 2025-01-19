import React from 'react'
import SignUp from '../../pages/SignUp'
import Logo from '../Logo'
import {Link, useNavigate} from 'react-router-dom'

function Header() {

const navigate = useNavigate();
const navItems = [

  {
    name: 'SignUP',
    active: true,
    slug: '/signup'
  },

  
  {
    name: 'UserDetails',
    active: true,
    slug: '/userdetails'
  },
  
  {
    name: 'Image Recomendation',
    active: true,
    slug: '/imageRecomendation'
  },

  {
    name: 'Todo',
    active: true,
    slug: '/todoExercises'
  },

]
  





  return (
    <div className='flex mt-0 w-full justify-between bg-blue-950 h-auto items-center fixed top-0 z-10'>
      <Link to="/"><Logo width = '50px' /></Link>
      
      <ul className='flex w-auto mr-6 justify-center h-auto items-center'>
        {navItems.map((items) => {
          if(items.active){
            return (<li key = {items.name} className='ml-2 text-lg font-sans'>
              <button className='text-white bg-blue-950 m-2 text-center font-thin' 
              onClick = {() => navigate(items.slug)}>{items.name}</button></li>)
          }
        }
        )}
      </ul>
    </div>
  )
}

export default Header