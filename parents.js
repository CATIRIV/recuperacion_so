const { fork } = require('child_process');

// Definir los vectores
const A = [1, 2, 3, 4, 5];
const B = [5, 4, 3, 2, 1];

// Array para guardar los resultados
const results = [];
let activeProcesses = 0;

A.forEach((elementA, index) => {
  const child = fork('./child.js'); // Crear un proceso hijo

  activeProcesses++;

  // Enviar datos al hijo
  child.send({ elementA, elementB: B[index] });

  // Recibir resultado del hijo
  child.on('message', (result) => {
    results[index] = result;
    activeProcesses--;

    // Monitorear procesos activos
    console.log(`Proceso hijo finalizado. Procesos restantes: ${activeProcesses}`);

    // Verificar si todos los procesos han terminado
    if (activeProcesses === 0) {
      console.log('Vector resultado:', results);
    }
  });

  // Manejo de errores
  child.on('error', (err) => {
    console.error(`Error en el proceso hijo: ${err.message}`);
  });

  // Monitorear cierre del proceso hijo
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`El proceso hijo finalizó con código ${code}`);
    }
  });
});
