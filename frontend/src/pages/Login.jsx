import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async()=>{
    try{
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password
      }); 

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    }catch(err){
      console.log(err);
      alert("Credenciales incorrectas");
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">
        <h2 className="text-2xl font-bold text-center mb-6">
          Iniciar Sesión
        </h2>

        <input
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default Login;
