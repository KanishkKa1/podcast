import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pick from './components/Pick';
import Listener from './components/Listener';
import Speaker from './components/Speaker';
import Hero from './components/Hero';
import Signin from './components/Signin';
import Signup from './components/signup';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path="/listener" element={<Listener />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/pick" element={<Pick />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
