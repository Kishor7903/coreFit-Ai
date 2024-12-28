import React from 'react'
import ImageSearch from '../components/imageSearch'
import RecepieFinder from '../components/RecepieFinder'

function ImageRecomendation() {
  return (
    <div className='w-[100%] h-full flex flex-col justify-center items-center'>
      <div className='mt-20 w-auto h-auto'>
        <ImageSearch />
      </div>
      <div className='mt-20 w-auto h-auto'>
        <RecepieFinder></RecepieFinder>
      </div>
    </div>
  )
}

export default ImageRecomendation