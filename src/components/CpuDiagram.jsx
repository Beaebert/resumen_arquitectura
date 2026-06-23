import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CpuDiagram.css';

const CpuDiagram = () => {
  const [step, setStep] = useState(0);

  // States to represent registers
  const [registers, setRegisters] = useState({
    ip: '0010',
    ri: 'XXXX',
    rda: 'XXXX',
    a: 'XXXX',
  });

  // This function simulates the MOV A, [1101] instruction cycle
  const nextStep = () => {
    if (step === 0) {
      // Step 1: Fetch - IP to AM (Address Bus)
      setStep(1);
    } else if (step === 1) {
      // Step 2: Fetch - Memory sends 0111 1101 to RDA
      setRegisters({ ...registers, rda: '0111 1101' });
      setStep(2);
    } else if (step === 2) {
      // Step 3: Fetch - RDA to RI
      setRegisters({ ...registers, ri: '0111 1101' });
      setStep(3);
    } else if (step === 3) {
      // Step 4: Execute - RI (address part 1101) to AM
      setStep(4);
    } else if (step === 4) {
      // Step 5: Execute - Memory sends data 0110 to RDA
      setRegisters({ ...registers, rda: '0110' });
      setStep(5);
    } else if (step === 5) {
      // Step 6: Execute - RDA to Reg A
      setRegisters({ ...registers, a: '0110' });
      setStep(6);
    }
  };

  const reset = () => {
    setStep(0);
    setRegisters({ ip: '0010', ri: 'XXXX', rda: 'XXXX', a: 'XXXX' });
  };

  return (
    <div className="cpu-diagram glass-panel">
      <div className="controls">
        <button className="cyber-btn" onClick={nextStep} disabled={step === 6}>
          {step === 0 ? '▶ Iniciar Ciclo' : step === 6 ? 'Completado' : 'Siguiente Paso'}
        </button>
        <button className="cyber-btn outline" onClick={reset}>↻ Reset</button>
        <span className="step-indicator mono">Paso: {step}/6</span>
      </div>

      <div className="diagram-area">
        {/* Memory */}
        <div className="component memory">
          <div className="comp-title">Memoria</div>
          <div className="mem-cell mono">1101 : 0110</div>
          <div className="mem-cell mono">0010 : 0111 1101</div>
        </div>

        {/* Control Unit / RI */}
        <div className="component control-unit">
          <div className="comp-title">UC / RI</div>
          <div className={`register mono ${step >= 3 ? 'highlight' : ''}`}>
            RI: {registers.ri}
          </div>
        </div>

        {/* Registers */}
        <div className="registers-block">
          <div className="component reg ip">
            <div className="comp-title">IP</div>
            <div className={`register mono ${step === 1 ? 'highlight' : ''}`}>
              {registers.ip}
            </div>
          </div>
          <div className="component reg rda">
            <div className="comp-title">RDA</div>
            <div className={`register mono ${step === 2 || step === 5 ? 'highlight' : ''}`}>
              {registers.rda}
            </div>
          </div>
          <div className="component reg a">
            <div className="comp-title">Reg A</div>
            <div className={`register mono ${step === 6 ? 'highlight-green' : ''}`}>
              {registers.a}
            </div>
          </div>
        </div>

        {/* Animated Data Packets (Buses) */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div 
              className="data-packet"
              initial={{ top: '60%', left: '40%' }}
              animate={{ top: '20%', left: '10%' }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => console.log('Fetch IP -> Mem')}
            >
              {registers.ip}
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div 
              className="data-packet highlight"
              initial={{ top: '20%', left: '10%' }}
              animate={{ top: '50%', left: '60%' }}
              transition={{ duration: 1 }}
            >
              0111 1101
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              className="data-packet highlight"
              initial={{ top: '50%', left: '60%' }}
              animate={{ top: '20%', left: '60%' }}
              transition={{ duration: 1 }}
            >
              0111 1101
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              className="data-packet"
              initial={{ top: '20%', left: '60%' }}
              animate={{ top: '20%', left: '10%' }}
              transition={{ duration: 1 }}
            >
              1101
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              className="data-packet highlight-green"
              initial={{ top: '20%', left: '10%' }}
              animate={{ top: '50%', left: '60%' }}
              transition={{ duration: 1 }}
            >
              0110
            </motion.div>
          )}

          {step === 6 && (
            <motion.div 
              className="data-packet highlight-green"
              initial={{ top: '50%', left: '60%' }}
              animate={{ top: '80%', left: '40%' }}
              transition={{ duration: 1 }}
            >
              0110
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      <div className="explanation">
        {step === 0 && <p>Estado Inicial. IP apunta a 0010. Esperando ejecución de instrucción.</p>}
        {step === 1 && <p><b>FASE DE PEDIDO (Fetch):</b> El valor de IP (0010) viaja por el Bus de Direcciones hacia la Memoria.</p>}
        {step === 2 && <p><b>FASE DE PEDIDO:</b> La Memoria envía la instrucción contenida en 0010 (`0111 1101` = MOV A, [dddd]) hacia el RDA por el Bus de Datos.</p>}
        {step === 3 && <p><b>FASE DE PEDIDO:</b> El dato pasa del RDA al Registro de Instrucción (RI). La UC ahora sabe qué hacer.</p>}
        {step === 4 && <p><b>FASE DE EJECUCIÓN (Execute):</b> Es un MOV desde memoria. La UC extrae la dirección `1101` del RI y la envía por el Bus de Direcciones.</p>}
        {step === 5 && <p><b>FASE DE EJECUCIÓN:</b> La Memoria lee la dirección 1101 y coloca su contenido (`0110`) en el Bus de Datos hacia el RDA.</p>}
        {step === 6 && <p><b>FASE DE EJECUCIÓN:</b> El valor `0110` viaja del RDA a través del Bus Y y la ALU hacia el Registro A. ¡Ciclo completado!</p>}
      </div>
    </div>
  );
};

export default CpuDiagram;
