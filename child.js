process.on('message', (data) => {
    const { elementA, elementB } = data;
  
    // Validar datos
    if (typeof elementA !== 'number' || typeof elementB !== 'number') {
      process.send({ error: 'Datos inválidos' });
      process.exit(1); // Salida con error
    }
  
    // Calcular suma
    const result = elementA + elementB;
  
    // Enviar resultado al padre
    process.send(result);
  
    // Terminar proceso
    process.exit(0); // Salida exitosa
  });