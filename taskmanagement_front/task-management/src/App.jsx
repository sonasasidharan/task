
import './App.css'
import './bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { Routes,Route } from 'react-router-dom'



import Auth from './Pages/Auth';
import Home from './Pages/Home';
import Dash from './Pages/Dash';
import TaskDetails from './Pages/TaskDetails';



function App() {


  return (
    <>
   <Routes>
    <Route path='/auth' element={<Auth/>}></Route>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/dash' element={<Dash/>}></Route>
    <Route path='/details/:tid' element={<TaskDetails/>}></Route>
   </Routes>
   <ToastContainer/>
   
    </>
  )
}

export default App
