import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home' 
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route,Routes} from 'react-router-dom'
// import { AnimatePresence } from 'framer-motion'

function App() {

  return (
    
    // <AnimatePresence mode='wait'>
  <Routes>
    <Route path ='/' default element={<Register/>}></Route>
    <Route path ='/login' element={<Login/>}></Route>
    <Route path ='/home/*' element={<Home/>}></Route>

  </Routes>
  // </AnimatePresence>
  )
}

export default App
