# ArchGuide: Simulador de Data Path del Microprocesador

¡Bienvenido a **ArchGuide**! Este repositorio sirve como guía interactiva y herramienta de estudio para entender el recorrido interno de los datos (Data Path) dentro de una arquitectura de microprocesador clásica.

## 🎯 Objetivo

En el estudio de Arquitectura de Computadoras, es común tener dificultades trazando cómo viaja la información entre la Memoria, los Registros y la Unidad Aritmético Lógica (UAL). Muchos estudiantes cometen el error de asumir que los datos "saltan" de un lugar a otro. 

ArchGuide proporciona una visualización paso a paso de la instrucción `SUB A, [0111]` para demostrar que la información debe viajar estrictamente a través de los **Buses físicos**:
- **Bus de Direcciones:** Lleva las direcciones desde el PC o Registro de Instrucción hacia la Memoria.
- **Bus de Datos:** Transporta la información de regreso desde la Memoria a los registros del procesador.
- **Bus W (Resultados):** Transporta el resultado de la UAL a su registro de destino.

## 🛠️ Tecnologías

Este proyecto es una Single Page Application construida con:
- **React (Vite):** Manejo del estado del ciclo de ejecución mediante `useState`.
- **CSS3 / SVG:** Animaciones nativas y Glassmorphism para visualizar los paquetes de datos fluyendo en tiempo real sin dependencias de canvas pesadas.

## 🚀 Cómo ejecutar localmente

Al ser un proyecto creado con Vite, necesitas tener [Node.js](https://nodejs.org/) instalado. Sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone <tu-repositorio-url>
   cd ArchGuide
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en la URL que te indique la terminal (por defecto suele ser `http://localhost:5173`).

## 📖 Ciclo de Ejecución (Fetch and Execute)

La simulación ilustra claramente dos grandes fases:

1. **Fase Pedido (Fetch):** El Program Counter (PC) pide la instrucción. La Memoria la devuelve y se guarda en el Registro de Instrucción (RI).
2. **Fase Ejecución (Execute):** Se extrae la dirección del operando (`0111`) del RI. Se *vuelve a mandar* esta dirección por el **Bus de Direcciones**. La Memoria saca el dato y lo devuelve por el **Bus de Datos**. Solo entonces la UAL puede realizar la resta.

¡Esperamos que ArchGuide te ayude a aprobar tus próximos exámenes y dominar el funcionamiento interno de la CPU!
