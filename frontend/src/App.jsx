import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pick from './components/Pick';
import Listener from './components/Listener';
import Speaker from './components/Speaker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/listener" element={<Listener />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/pick" element={<Pick />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
