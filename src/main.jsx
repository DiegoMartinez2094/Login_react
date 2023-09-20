import { createRoot } from 'react-dom/client';
import RegistroForm from './components/registro';
import IngresoForm from './components/ingreso';

const root = createRoot(document.getElementById('registro'));
const root2 = createRoot(document.getElementById('ingreso'));

root.render(<RegistroForm />);
root2.render(<IngresoForm />);
