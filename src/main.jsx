import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { login } from './store/authSlice.js'
import Home from './components/Home'
import SignUp from './pages/SignUp.jsx'
import Search from './components/search.jsx'
import UserDetails from './pages/UserDetails.jsx'
import Recomendations from './pages/Recomendations.jsx'
import ImageRecomendation from './pages/ImageRecomendation.jsx'




const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/userDetails",
      element: <UserDetails />
    },
    {
      path: "/recomendations",
      element: <Recomendations />
    },
    {
      path: "/imageRecomendation",
      element: <ImageRecomendation />
    }

  ]

}])







createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store  = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
  
)
