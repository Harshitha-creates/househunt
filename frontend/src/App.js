import './App.css';
import React from 'react';
import reactRouter from 'react-router-dom';
function App() {
  return (
    <reactRouter.BrowserRouter>
      <reactRouter.Routes>
        <reactRouter.Route path="/" element={<Home />} />
        <reactRouter.Route path="/about" element={<About />} />
        <reactRouter.Route path="/contact" element={<Contact />} />
      </reactRouter.Routes>
    </reactRouter.BrowserRouter>
  );
}

export default App;
