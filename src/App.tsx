import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GryffindorPage from './pages/GryffindorPage';
import SlytherinPage from './pages/SlytherinPage';
import RavenclawPage from './pages/RavenclawPage';
import HufflepuffPage from './pages/HufflepuffPage';
import LibraryPage from './pages/LibraryPage';
import AdminPage from './pages/AdminPage';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
        <BackgroundAnimation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gryffindor" element={<GryffindorPage />} />
          <Route path="/slytherin" element={<SlytherinPage />} />
          <Route path="/ravenclaw" element={<RavenclawPage />} />
          <Route path="/hufflepuff" element={<HufflepuffPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/admin-secret-hogwarts-2024" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;