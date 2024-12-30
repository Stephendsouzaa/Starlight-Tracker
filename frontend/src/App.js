import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import StarInfo from './pages/StarInfo';
import ConstellationInfo from './pages/ConstellationInfo';
import Gallery from './pages/Gallery';
import SpaceNews from './pages/SpaceNews';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FileUpload from './pages/FileUpload';
import PlanetaryInfo from './pages/PlanetaryInfo';
import AstronomyEvents from './pages/AstronomyEvents';
import SpaceFacts from './pages/SpaceFacts';
import SolarSystemMap from './pages/SolarSystemMap';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/star-info" element={<StarInfo />} />
                <Route path="/constellation-info" element={<ConstellationInfo />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/space-news" element={<SpaceNews />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/file-upload" element={<FileUpload />} />
                <Route path="/planetary-info" element={<PlanetaryInfo />} />
                <Route path="/astronomy-events" element={<AstronomyEvents />} />
                <Route path="/space-facts" element={<SpaceFacts />} />
                <Route path="/solar-system-map" element={<SolarSystemMap />} />
            </Routes>
        </Router>
    );
}

export default App;
