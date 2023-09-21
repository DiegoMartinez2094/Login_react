import React, { useState } from 'react';

export default function IngresoForm() {

  const [correo, setCorreo] = useState(''); // correo es la variable que almacena, setCorreo es la funcion que actualiza el estado de la variable
  const [contraseña, setContraseña] = useState('');

  const onCorreoChange = (e) => { //controlador de eventos 
    setCorreo(e.target.value);
  };

  const onContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const onIngresoClick = async () => {
    try {
      const response = await fetch('http://192.168.129.72:5021/api/ingresar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // el tipo de archivo que se enviará es json
        },
        body: JSON.stringify({ correo, contraseña }), //convierte los datos del formulario en JSON
      });

      if (response.status === 200) {
        // Ingreso exitoso, puedes redirigir o mostrar un mensaje de éxito
        console.log('Usuario ingresado correctamente');
        alert('BIENVENIDO');

        // Limpiar los campos después del ingreso exitoso
        setCorreo('');
        setContraseña('');
      } else {
        // Manejar errores aquí
        
        alert('credenciales incorrectas');
        setCorreo('');
        setContraseña('');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }

  };

  return (
    <div>
      <div>
        <label htmlFor="correo">Correo Electrónico: </label>
        <input 
          type="text"
          id="correo"
          name="correo"
          onChange={onCorreoChange}
          value={correo}
        />
        <br/><br/>
      </div>
      <div>
        <label htmlFor="contraseña">Contraseña: </label>
        <input
          type="password"
          id="contraseña"
          name="contraseña"
          onChange={onContraseñaChange}
          value={contraseña}
        />
        <br/><br/>
      </div>
      <button onClick={onIngresoClick}>Ingresar</button>
    </div>
  );
}
