import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'

function App() {
  

  return (
    <div className='min-h-screen flex flex-wrap content-between'>
  
    <div className='w-screen'>
        <Header />
      <main className='mt-[4.3rem] z-0'>
        <Outlet />
      </main>
      
    </div>
  </div>
  )
}
  


export default App
