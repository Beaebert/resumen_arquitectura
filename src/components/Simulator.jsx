import { useState } from 'react';
import { Play, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

const STEPS = [
  {
    title: "Estado Inicial",
    desc: "El sistema se encuentra en reposo. El PC (Program Counter) apunta a la dirección 0000 en memoria. Todos los registros están en su valor inicial.",
    state: { pc: "0001", irOp: "0000", irAddr: "0000", regA: "1001", regB: "0000", aluOp: "N/A", aluRes: "0000" },
    activeComps: [],
    readingMem: [],
    paths: []
  },
  {
    title: "Fase Pedido (Paso 1)",
    desc: "El PC coloca la dirección '0001' en el Bus de Direcciones. Fíjate cómo la señal viaja físicamente hasta la Memoria para ubicar la celda correspondiente.",
    state: { pc: "0001", irOp: "0000", irAddr: "0000", regA: "1001", regB: "0000", aluOp: "N/A", aluRes: "0000" },
    activeComps: ['pc'],
    readingMem: ['0001'],
    paths: [
      { points: "100,230 100,300 600,300", type: "glow-address" }
    ]
  },
  {
    title: "Fase Pedido (Paso 2)",
    desc: "La Memoria lee la dirección '0001' y saca su contenido ('0101 0111') poniéndolo en el Bus de Datos. El dato viaja hacia el Registro de Instrucción (RI).",
    state: { pc: "0001", irOp: "0000", irAddr: "0000", regA: "1001", regB: "0000", aluOp: "N/A", aluRes: "0000" },
    activeComps: ['memory', 'ir'],
    readingMem: ['0001'],
    paths: [
      { points: "600,100 20,100", type: "glow-data" },
      { points: "325,100 325,180", type: "glow-data" }
    ]
  },
  {
    title: "Fase Pedido (Paso 3)",
    desc: "El RI guarda la instrucción ('0101 0111'). La Unidad de Control decodifica el '0101' como una resta (SUB). El PC se incrementa a '0010' para la próxima instrucción.",
    state: { pc: "0010", irOp: "0101", irAddr: "0111", regA: "1001", regB: "0000", aluOp: "N/A", aluRes: "0000" },
    activeComps: ['ir', 'uc'],
    readingMem: [],
    paths: []
  },
  {
    title: "Fase Ejecución (Paso 1)",
    desc: "Ahora necesitamos el dato. La parte de dirección del RI ('0111') se pone en el Bus de Direcciones y viaja a la Memoria.",
    state: { pc: "0010", irOp: "0101", irAddr: "0111", regA: "1001", regB: "0000", aluOp: "N/A", aluRes: "0000" },
    activeComps: ['ir'],
    readingMem: ['0111'],
    paths: [
      { points: "325,230 325,300 600,300", type: "glow-address" }
    ]
  },
  {
    title: "Fase Ejecución (Paso 2)",
    desc: "La Memoria ubica la celda '0111' y saca el operando ('0000 0101') por el Bus de Datos. Este viaja hasta la entrada temporal de la UAL (Registro B).",
    state: { pc: "0010", irOp: "0101", irAddr: "0111", regA: "1001", regB: "0000", aluOp: "N/A", aluRes: "0000" },
    activeComps: ['memory', 'reg-b'],
    readingMem: ['0111'],
    paths: [
      { points: "600,100 20,100 20,400 50,400", type: "glow-data" },
      { points: "20,450 250,450", type: "glow-data" }
    ]
  },
  {
    title: "Fase Ejecución (Paso 3)",
    desc: "El Registro temporal B guarda el dato '0101'. La UAL recibe la orden de restar: A (1001) - B (0101) = 0100. El resultado viaja por el Bus W hacia el Registro A.",
    state: { pc: "0010", irOp: "0101", irAddr: "0111", regA: "1001", regB: "0101", aluOp: "A - B", aluRes: "0100" },
    activeComps: ['alu', 'reg-a'],
    readingMem: [],
    paths: [
      { points: "110,500 110,550 400,550 400,450", type: "glow-result" }
    ]
  },
  {
    title: "Ejecución Completada",
    desc: "El Registro A actualiza su valor a '0100'. La instrucción SUB A, [0111] ha terminado. Fíjate cómo la información viajó lógicamente sin 'saltos mágicos'.",
    state: { pc: "0010", irOp: "0101", irAddr: "0111", regA: "0100", regB: "0101", aluOp: "N/A", aluRes: "0000" },
    activeComps: ['reg-a'],
    readingMem: [],
    paths: []
  }
];

function Simulator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = STEPS[currentStepIndex];
  const { state, activeComps, readingMem, paths } = step;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(currentStepIndex + 1);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const isComponentActive = (name) => activeComps.includes(name) ? 'active' : '';
  const isMemReading = (addr) => readingMem.includes(addr) ? 'reading' : '';

  return (
    <div className="simulator-section">
      <div className="sim-header">
        <h3 className="section-title">// DIAGRAMA INTERACTIVO - PROCESADOR 4 BITS</h3>
        <div className="sim-controls">
          <button onClick={handlePrev} disabled={currentStepIndex === 0}>
            <SkipBack size={16} /> Anterior
          </button>
          <button className="btn-play" onClick={handleNext} disabled={currentStepIndex === STEPS.length - 1}>
            <Play size={16} /> Siguiente
          </button>
          <button onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </button>
          <div className="step-counter">
            <span className="badge-step">-</span> Paso {currentStepIndex + 1}/{STEPS.length}
          </div>
        </div>
      </div>

      <div className="diagram-wrapper">
        <h2 className="diagram-title">Modelo de Procesador 4 Bits</h2>
        
        <div className="diagram-container">
          <svg className="buses-svg" width="800" height="500">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--bus-idle)" />
              </marker>
            </defs>

            {/* Static Buses */}
            <g id="bus-direcciones" className="bus">
              <polyline points="100,180 100,250 600,250" markerEnd="url(#arrow)" />
              <polyline points="325,180 325,250" />
              <text x="450" y="240" className="bus-label">Bus de Direcciones</text>
            </g>

            <g id="bus-datos" className="bus">
              <polyline points="600,50 20,50 20,350 50,350" />
              <polyline points="325,50 325,130" markerEnd="url(#arrow)" />
              <polyline points="20,400 250,400" markerEnd="url(#arrow)" />
              <text x="450" y="40" className="bus-label">Bus de Datos</text>
            </g>

            <g id="bus-w" className="bus">
              <polyline points="110,450 110,480 400,480 400,400" markerEnd="url(#arrow)" />
              <text x="250" y="475" className="bus-label">Bus W (Resultados)</text>
            </g>
            
            {/* Dynamic Animation Layer */}
            <g id="animation-layer">
              {paths.map((p, i) => {
                let strokeColor = "white";
                if (p.type === 'glow-address') strokeColor = "var(--bus-active-address)";
                if (p.type === 'glow-data') strokeColor = "var(--bus-active-data)";
                if (p.type === 'glow-result') strokeColor = "var(--bus-active-result)";
                
                return (
                  <polyline 
                    key={i} 
                    points={p.points} 
                    className={`data-packet ${p.type}`} 
                    stroke={strokeColor} 
                  />
                );
              })}
            </g>
          </svg>

          {/* Components */}
          <div className={`component uc ${isComponentActive('uc')}`} style={{ left: 50, top: 70 }}>
            <div className="comp-title">UC</div>
            <div className="comp-desc">Unidad de Control</div>
          </div>

          <div className={`component pc ${isComponentActive('pc')}`} style={{ left: 50, top: 130 }}>
            <div className="comp-title">PC</div>
            <div className="value">{state.pc}</div>
          </div>

          <div className={`component ir ${isComponentActive('ir')}`} style={{ left: 250, top: 130 }}>
            <div className="comp-title">RI (Reg. Instrucción)</div>
            <div className="value-split">
              <span className="val-ir-op">{state.irOp}</span>
              <span className="val-ir-addr">{state.irAddr}</span>
            </div>
          </div>

          <div className={`component alu ${isComponentActive('alu')}`} style={{ left: 50, top: 350, height: 100 }}>
            <div className="comp-title">UAL</div>
            <div className="alu-op">{state.aluOp}</div>
            <div className="value" style={{ marginTop: 10 }}>{state.aluRes}</div>
          </div>

          <div className={`component reg-a ${isComponentActive('reg-a')}`} style={{ left: 400, top: 350 }}>
            <div className="comp-title">Registro A</div>
            <div className="value">{state.regA}</div>
          </div>

          <div className={`component reg-b ${isComponentActive('reg-b')}`} style={{ left: 250, top: 350 }}>
            <div className="comp-title">Registro Temp (B)</div>
            <div className="value">{state.regB}</div>
          </div>

          <div className={`component memory ${isComponentActive('memory')}`} style={{ left: 600, top: 20, height: 460 }}>
            <div className="comp-title">Memoria</div>
            <table className="mem-table">
              <thead>
                <tr><th>Dir</th><th>Datos</th></tr>
              </thead>
              <tbody>
                <tr className={isMemReading('0001')}><td>0001</td><td>0101 0111</td></tr>
                <tr className={isMemReading('0010')}><td>0010</td><td>0000 0000</td></tr>
                <tr><td>...</td><td>...</td></tr>
                <tr className={isMemReading('0111')}><td>0111</td><td>0000 0101</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="step-explanation">
        <div className="step-number">{currentStepIndex + 1}</div>
        <div className="step-text">
          <h4>{step.title}</h4>
          <p>{step.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Simulator;
