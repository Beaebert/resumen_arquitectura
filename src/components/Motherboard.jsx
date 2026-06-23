import { ArrowLeft } from 'lucide-react';
import Simulator from './Simulator';
import Theory from './Theory';

function Motherboard({ onNavigate }) {
  return (
    <div className="motherboard-container">
      <header className="module-header">
        <button className="btn-back" onClick={() => onNavigate('home')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2>PROCESADOR 4 BITS - Modelo de Funcionamiento</h2>
          <p>UC / UAL / Registros / Flip-Flops / Buses / Memoria / Ciclo Fetch-Decode-Execute</p>
        </div>
      </header>

      <main className="module-content">
        <Simulator />
        <Theory />
      </main>
      
      <footer className="home-footer">
        ARCH_GUIDE v1.0 — Guía Visual e Interactiva de Hardware y Software
      </footer>
    </div>
  );
}

export default Motherboard;
