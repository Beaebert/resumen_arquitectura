import { useState } from 'react';
import Home from './components/Home';
import Motherboard from './components/Motherboard';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app-root">
      {currentView === 'home' && <Home onNavigate={navigateTo} />}
      {currentView === 'motherboard' && <Motherboard onNavigate={navigateTo} />}
    </div>
  );
}

export default App;
