// Main application router setup
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Program from './Components/Program';
import Speakers from './Components/Speakers';
import Registration from './Components/Registration';
import CallForPapers from './Components/CallForPapers';
import AbstractGuidelines from './Components/AbstractGuidelines';
import Organizers from './Components/Organizers';
import Gallery from './Components/Gallery';
import ContactUs from './Components/ContactUs';
import Sponsors from './Components/Sponsors';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/program" element={<Program />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/call-for-papers" element={<CallForPapers />} />
        <Route path="/abstract-guidelines" element={<AbstractGuidelines />} />
        <Route path="/organizers" element={<Organizers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </Router>
  );
}

export default App;
