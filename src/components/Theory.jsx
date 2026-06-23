function Theory() {
  return (
    <div className="theory-section">
      <h3 className="section-title">// REGISTROS - FLIP-FLOP MAESTRO-ESCLAVO</h3>
      
      <div className="theory-card">
        <h4>FLIP-FLOP MAESTRO-ESCLAVO (Master-Slave D Flip-Flop)</h4>
        
        <div className="flip-flop-diagram">
          <div className="clk-signal">
            <span>CLK</span>
            <svg width="100" height="30">
              <path d="M 0,20 L 20,20 L 20,5 L 50,5 L 50,20 L 80,20 L 80,5 L 100,5" fill="none" stroke="#eab308" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="ff-flow">
            <span className="label">D (Input)</span>
            <div className="line"></div>
            <div className="ff-box master">
              <span className="ff-title">MASTER</span>
              <span className="ff-clk">(CLK = 1)</span>
            </div>
            <div className="line label-top"><span>NOT CLK</span></div>
            <div className="ff-box slave">
              <span className="ff-title">SLAVE</span>
              <span className="ff-clk">(CLK = 0)</span>
            </div>
            <div className="line"></div>
            <span className="label">Q (Output)</span>
          </div>
        </div>

        <p className="theory-text">
          Cuando CLK=1, el <span className="highlight-pink">Master</span> captura la entrada D. Cuando CLK=0, el <span className="highlight-blue">Slave</span> transfiere el valor almacenado a la salida Q.
        </p>
      </div>

      <div className="theory-card">
        <p className="theory-text">
          Los <strong>registros del CPU</strong> están construidos con flip-flops tipo D en configuración maestro-esclavo. Cada bit de un registro utiliza un flip-flop.
        </p>
        <p className="theory-text">
          Un registro de 4 bits contiene <strong>4 flip-flops maestro-esclavo</strong> operando en paralelo, todos sincronizados por la misma señal de reloj (CLK).
        </p>
        <p className="theory-text">
          La configuración maestro-esclavo garantiza que el valor se captura y transfiere en flancos distintos del reloj, evitando <strong>race conditions</strong> y asegurando la estabilidad del dato durante todo el ciclo de reloj.
        </p>
      </div>

      <h3 className="section-title mt-8">// TEORÍA - ARQUITECTURA DE VON NEUMANN</h3>

      <div className="theory-card">
        <h4>ARQUITECTURA DE VON NEUMANN (Von Neumann Architecture)</h4>
        <p className="theory-text mb-4">
          El modelo propuesto por <strong>John von Neumann</strong> en 1945 establece los principios fundamentales de la computadora de programa almacenado (<strong>stored-program computer</strong>).
        </p>

        <div className="von-neumann-grid">
          <div className="vn-col">
            <h5>PRINCIPIOS FUNDAMENTALES</h5>
            <ul className="custom-list">
              <li>Memoria unificada para datos e instrucciones</li>
              <li>Procesamiento secuencial de instrucciones</li>
              <li>Unidad de Control + UAL = CPU</li>
              <li>Dispositivos de entrada/salida (I/O)</li>
              <li>Bus único compartido (Von Neumann bottleneck)</li>
            </ul>
          </div>
          <div className="vn-col warning-col">
            <h5>VON NEUMANN BOTTLENECK</h5>
            <p>
              El cuello de botella de Von Neumann surge porque instrucciones y datos comparten el mismo bus de memoria. La CPU debe esperar a que se complete una transferencia antes de iniciar otra, limitando el rendimiento del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theory;
