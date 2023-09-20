import express from 'express';
import dotenv from 'dotenv';
import { con } from './db/atlas.js';
import cors from 'cors'; // Importa el middleware CORS

dotenv.config();

const app = express();
const config = JSON.parse(process.env.My_server);
const db = await con();
const usuarios = db.collection('usuarios');

app.use(express.json());

// Habilita CORS
app.use(cors());

app.post('/api/registrar', async (req, res) => {
  try {
    
    const { correo, contraseña } = req.body;
    console.log("correo: ", correo);
    console.log("contraseña: ", contraseña);

  
    // Verificar si el correo ya está registrado
    const usuarioExistente = await usuarios.findOne({ correo });

    if (usuarioExistente) {
      // El correo ya está registrado, enviar una respuesta de error
      return res.status(400).json({ message: 'Credenciales registradas con anterioridad' });
    }

    // Si el correo no está registrado, inserta los datos en la colección de usuarios
    await usuarios.insertOne({ correo, contraseña });

    // Enviar una respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    // Manejar errores, si los hay
    console.error('Error al registrar usuario app.js:', error);
    res.status(500).json({ message: 'Error al registrar usuario app.js' });
  }
});

app.post('/api/ingresar', async (req, res) => {
  try {
    // Lógica para procesar la solicitud de ingreso
    const { correo, contraseña } = req.body;
    console.log("Intento de ingreso con correo: ", correo);
    
    // Busca el usuario por correo y contraseña
    const usuario = await usuarios.findOne({ correo, contraseña });

    if (usuario) {
      // Usuario autenticado correctamente, puedes realizar acciones adicionales aquí
      console.log('Usuario autenticado correctamente');
      res.status(200).json({ message: 'Usuario autenticado correctamente' });
    } else {
      // Las credenciales son incorrectas
      // Enviar un código de estado 400 (Bad Request) y un mensaje de error
      res.status(400).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    // Manejar errores, si los hay
    console.error('Error al realizar el ingreso en app.js:', error);
    res.status(500).json({ message: 'Error al realizar el ingreso en app.js' });
  }
});



app.listen(config.port, config.hostname, () => {
  console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
});
