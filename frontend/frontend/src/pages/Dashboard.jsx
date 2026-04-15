import { useEffect } from "react";
import axios from "axios";

function Dashboard() {
  //Estado de la lista de tareas
  const [tasks, setTasks] = useState([]);
  //Estado para la nueva tarea
  const [title, setTitle] = useState("");
  //obtenemos el token del localStorage
  const token = localStorage.getItem("token");
  //consultar las tareas al backend
  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      //guardar el estado de las tareas
      setTasks(res.data);
    } catch (error) {
      console.error("Error al obtener las tareas", error);
    }
  };

  //crear una nueva tarea
  const createTask = async () => {
    try {
      await axios.post("http://localhost:3000/api/tasks", { title }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      //limpiar el input
      setTitle("");
      getTasks();
    } catch (error) {
      console.error("Error al crear la tarea", error);
    }
  };

  //se ejecuta al cargar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {        
        const res = await axios.get("http://localhost:3000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setTasks(res.data);
      } catch (error) {        
        console.error("Error al cargar las tareas", error);
      }    
    };
    fetchTasks();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
        <h2c className="text-3xl font-bold text-center mb-6 text-gray-800">Mis Tareas</h2c>
        {/* Input para crear una nueva tarea */}
        <input
          type="text"
          placeholder="Nueva tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Boton para crear la tarea */}
        <button onClick={createTask}>Agregar tarea</button>
        {/* Lista de tareas */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Dashboard;