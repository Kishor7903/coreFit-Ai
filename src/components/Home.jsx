import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {

  const navigate = useNavigate();
  return (
    <div>Home
      <div>
        Search !!!
        <button onClick={() => navigate('/userDetails')}>Search</button>
      </div>
    </div>
  )
}

export default Home