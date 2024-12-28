import React from 'react'
import Search from '../components/search'
import smartWatch from '../assets/smartWatch.jpg'
import { Parallax, Background } from 'react-parallax';
import { useState } from 'react';

function UserDetails() {
    const [isLoading, setLoading] = useState(false)
  return (
    <div>
        <div className={`${isLoading?"blur-sm":""}`}>

        
        <div>
            <Parallax blur={{min: -10, max: 15}} bgImage={smartWatch} strength={600}>
                <div className="h-[500px] bg-center bg-cover relative flex items-center" >
                    <div className='ml-4'>
                        <h2 className='font-bold text-[100px]'>Get your Fitness Recomendations</h2>
                    </div>
                </div>
            </Parallax>
        </div>

        <div className='w-[80%] m-auto'>
            <Search />
        </div>
        </div>
    </div>
  )
}

export default UserDetails