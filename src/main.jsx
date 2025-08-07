import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider, createRoutesFromElements,Route,useLoaderData } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Contact from './components/contact/Contact.jsx';
import About from './components/About/About.jsx';
import WebsiteSecurityChecker from './components/PasteUrl/WebsiteSecurityChecker.jsx';
import Sustainability from './components/Sustainability/SustainabilityChecker.jsx';
import Login from './login.jsx';
import Signup from './Signup.jsx';

const router=createBrowserRouter(
 createRoutesFromElements(
  <Route path='/'element={<App />}
  >
    <Route path='' element={<Home/>}/>
    <Route path='contact' element={<Contact/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='PasteUrl' element={<WebsiteSecurityChecker/>}/>
    <Route path='Sustainability' element={<Sustainability/>}/>
    <Route path='login' element={<Login />} />
    <Route path='signup' element={<Signup />} />
    <Route path="*" element={<h1 className="text-white p-6 text-3xl">404 - Page Not Found</h1>} />
  </Route>
 )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
