import React from 'react'
import  logo from '../assets/Logo.jpg'

function Logo({
    width
}) {
  return (
    <div><img src={logo} alt="" width={width}  /></div>
  )
}

export default Logo