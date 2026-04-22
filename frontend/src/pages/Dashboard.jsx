import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token)navigate("/");
  },[]);

//obtener tareas
  const getTasks = async()=>{
    // CORRECCIÓN: Se cambió /api/login por /api/tasks
    const res = await axios.get("http://localhost:3000/api/tasks",{
      headers: {Authorization: token}
    });
    setTasks(res.data);
  };

  useEffect(()=>{
    if(token) getTasks();
  }, []);

  const createTask = async()=>{
    await axios.post('http://localhost:3000/api/tasks',
      {title, description},
      {headers:{Authorization:token}}
    );
    setTitle("");
    setDescription("");
    getTasks();
  };

  const updateTask = async (id) => {
    // Para este ejemplo, pedimos el nuevo título con un prompt.
    // Lo ideal en el futuro es abrir un modal o llenar el formulario superior.
    const newTitle = prompt("Ingresa el nuevo título para la tarea:");
    const newDescription = prompt("Ingresa la nueva descripción para la tarea:");
    
    if (!newTitle || !newDescription) return; // Si el usuario cancela, no hacemos nada

    try {
      await axios.put(`http://localhost:3000/api/tasks/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: token } }
      );
      // Recargamos las tareas para ver los cambios reflejados
      getTasks();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return(
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📋 Mis Tareas</h2>

        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded">
        Cerrar sesión
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-2">
        <input className="border p-2 flex-1 rounded" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input className="border p-2 flex-1 rounded" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}/>

        <button onClick={createTask} className="bg-blue-500 text-white px-4 rounded">Crear Tarea</button>
      </div>



      {/* LISTA */}

      <div className="grid gap-4">
        {tasks.map((t) => (
        <div key={t.id} className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <h3 className="font-bold">{t.title}</h3>
            <p className="text-gray-500 text-sm">{t.description}</p>
          </div>

          <div>
            <button onClick={()=>updateTask(t.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
          </div>

          <span className="text-xs bg-green-100 px-2 py-1 rounded">
          Activa
          </span>

        </div>))}
      </div>
    </div>


  );
}

export default Dashboard;
