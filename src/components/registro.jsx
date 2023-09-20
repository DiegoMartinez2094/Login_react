import React, { useState } from 'react';


export default function RegistroForm() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const onCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const onContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const onRegistroClick = async () => {
    try {
      const response = await fetch('http://127.10.10.10:5000/api/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      if (response.status === 201) {
        // Registro exitoso, puedes redirigir o mostrar un mensaje de éxito
        console.log('Usuario registrado correctamente');
        alert('Usuario registrado correctamente');

        // Limpiar los campos después del registro exitoso
        setCorreo('');
        setContraseña('');
      } else {
        // Manejar errores aquí
        console.error('Error al registrar usuario registro.jsx');
        alert('credenciales registradas anteriormente');
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
      <button onClick={onRegistroClick}>Registrar</button>
    </div>
  );
}
