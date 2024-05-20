import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Page404 from './page/pageCallback';
import Loggin from './page/pageLoggin';
import DashBoard from './page/pageDashboard';
import MostrarCalendario from './page/components/mostrarCalendario.jsx';
import ListarUsuario from './page/components/listarUsuario.jsx'
import AgregarUsuario from './page/components/agregarUsuario.jsx';
import Proyectos from './page/components/proyectos.jsx';
import Tareas from './page/components/tareas.jsx';


const isAuthenticated = () => {
  const token = Cookies.get('token');
  // Aquí puedes agregar lógica adicional para verificar si el token es válido
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};  

function App() {
  return (
      <Router>
          <Routes>
              <Route path="*" element={<Page404/>} />
              <Route path="/" element={<Loggin />} />
              <Route path="/dash" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
              <Route path="/calendario" element={<ProtectedRoute><MostrarCalendario/></ProtectedRoute>} />
              <Route path="/listausuario" element={<ProtectedRoute><ListarUsuario /></ProtectedRoute>} />
              <Route path="/agregarusuario" element={<ProtectedRoute><AgregarUsuario/></ProtectedRoute>}/>
              <Route path="/proyectos" element={<ProtectedRoute><Proyectos/></ProtectedRoute>} />
              <Route path="/tareas" element={<ProtectedRoute><Tareas/></ProtectedRoute>}/>
          </Routes>
      </Router>
  );
}

export default App;
