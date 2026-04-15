//importamos React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importamos las paginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Ruta de Login */}
          <Route path="/" element={<Login />} />
          {/* Ruta de Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 