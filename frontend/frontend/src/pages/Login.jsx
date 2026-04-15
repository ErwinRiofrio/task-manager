// hook para manejar estados
import { useState } from "react";
// librería para hacer peticiones http
import axios from "axios";
// hook para redireccionar
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 1. AGREGADO: Creamos el estado para manejar el error
  const [error, setError] = useState(""); 

  // para redireccionar a otra página
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); // Buena práctica: evita que la página se recargue por accidente
    setError(""); // Limpiamos errores previos al intentar de nuevo

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      
      // guardar el token en el localStorage
      localStorage.setItem("token", res.data.token);
      // redireccionar al dashboard
      navigate("/dashboard");

    } catch (err) { // Cambié 'error' a 'err' aquí para que no choque con nuestra variable de estado
      console.error("Error en el login", err);
      // 2. MODIFICADO: En lugar de un alert, actualizamos nuestro estado de error
      setError("Credenciales incorrectas. Por favor, intenta de nuevo."); 
    }
  };

  return (
    // Corregido: indig0-600 a indigo-600
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h1>

        {/* Mensaje de Error */}
        {error && (
          <p className="p-3 mb-4 text-center text-red-700 bg-red-100 rounded-lg">
            {error}
          </p>
        )}

        {/* 4. MOVILIZADO: Todo este bloque ahora está DENTRO de la Card */}
        <div className="space-y-4">
          <input 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            // Corregidos: borde, rounder-lg, focus:outline-node
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
          />

          <input 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
          />
        </div>

        <button 
          onClick={login} 
          // Corregidos: rounder-lg, tramsition
          className="w-full p-3 mt-6 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Ingresar
        </button>
      </div> {/* Fin del Card */}
      
    </div>
  );
}

export default Login;