import { Cpu, Network, HardDrive, Layers, ArrowRight } from 'lucide-react';

function Home({ onNavigate }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="badge">
          <span className="dot"></span>
          INTERACTIVE GUIDE
        </div>
        <h1>Arquitectura de Hardware & Software</h1>
        <p>Guía visual e interactiva para comprender los fundamentos de la arquitectura de computadoras. Nivel universitario con animaciones y diagramas esquemáticos.</p>
      </header>

      <section className="modules-section">
        <h2 className="section-title">// TEMAS DISPONIBLES</h2>
        
        <div className="modules-grid">
          {/* Card 1: Motherboard & CPU (Active) */}
          <div className="module-card active" onClick={() => onNavigate('motherboard')}>
            <div className="card-icon">
              <Cpu size={24} />
            </div>
            <div className="card-content">
              <h3>Motherboard & CPU</h3>
              <p>Funcionamiento interno del motherboard. Interacción entre la Unidad de Control (CU), ALU, registros con flip-flops maestro-esclavo, y memoria RAM. Ciclo Fetch-Decode-Execute.</p>
              <button className="btn-access">
                <ArrowRight size={16} /> ACCEDER
              </button>
            </div>
          </div>

          {/* Card 2: Arquitecturas (Inactive) */}
          <div className="module-card inactive">
            <div className="card-icon">
              <Network size={24} />
            </div>
            <div className="card-content">
              <h3>Arquitecturas de Computadoras</h3>
              <p>Evolución de las arquitecturas: Von Neumann, Harvard, Harvard Modificada. Comparativas y diagramas de cada modelo.</p>
              <span className="badge-coming-soon">PRÓXIMAMENTE</span>
            </div>
          </div>

          {/* Card 3: Memoria (Inactive) */}
          <div className="module-card inactive">
            <div className="card-icon">
              <HardDrive size={24} />
            </div>
            <div className="card-content">
              <h3>Memoria & Almacenamiento</h3>
              <p>Jerarquía de memoria: registros, caché (L1/L2/L3), RAM, almacenamiento secundario. Políticas de reemplazo y coherencia.</p>
              <span className="badge-coming-soon">PRÓXIMAMENTE</span>
            </div>
          </div>

          {/* Card 4: SO & Software (Inactive) */}
          <div className="module-card inactive">
            <div className="card-icon">
              <Layers size={24} />
            </div>
            <div className="card-content">
              <h3>Sistema Operativo & Software</h3>
              <p>Capas de abstracción del software. Kernel, drivers, sistema operativo. Procesos, hilos y scheduling.</p>
              <span className="badge-coming-soon">PRÓXIMAMENTE</span>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="home-footer">
        ARCH_GUIDE v1.0 — Guía Visual e Interactiva de Hardware y Software
      </footer>
    </div>
  );
}

export default Home;
