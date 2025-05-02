import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import this
import './index.css';
import App from './App.jsx';
import Navbar from './components/Navbar/navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap your components */}
      <Navbar />
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
