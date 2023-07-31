import { Route, Routes } from 'react-router-dom';
import './App.css';
import Emsheader from './components/Emsheader'
import Emsfooter from './components/Emsfooter'
import Home from './pages/Home'
import Register from './pages/Register'
import View from './pages/View'
import Edit from './pages/Edit'

function App() {
  return (
    <div className="App">

      <Emsheader />

      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/view/:id' element={<View/>}></Route>
      <Route path='/edit/:id' element={<Edit/>}></Route>

      </Routes>


      <Emsfooter />

    </div>
  );
}

export default App;
