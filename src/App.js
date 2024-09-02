import './App.css';
import { BrowserRouter, Route, Routes } from'react-router-dom';
import Home from './components/home/Home';
import Vehicles from './components/home/vehicles/Vehicles';
import Login from './components/login/Login';
import Bookings from './components/home/Bookings/Bookings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
  <BrowserRouter>
  <div className="d-flex app">
   <Sidebar/>
 <div className='col'>
  <div className='app'>
{/* <Navbar/> */}
  <Routes>
    <Route path='/' element= {< Login />} />
    <Route path='/home' element= {< Home   />} />
    <Route path='/vehicles' element= {< Vehicles />} />
    <Route path='/bookings' element= {< Bookings />} />
    {/* <Route path='/slider' element= {< Slider />} /> */}
  </Routes>
  </div>
   </div>
   </div>
  </BrowserRouter>
  );
}

export default App;

