import { useContext, createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectoContext = createContext()

export const useProyecto = () => useContext(ProyectoContext)

export default function ProyectoProvider({ children }) {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [tarea, setTarea] = useState({})

    const navigate = useNavigate()
    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 4000)
    }

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get("/proyectos", config)
                setProyectos(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [])

    const submitProyecto = async proyecto => {
        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
        return

    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            //sincronizar el estate
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)
            //mostrar alerta
            setAlerta({ msg: "Proyecto Actualizado Correctamente", erro: false })
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post("/proyectos", proyecto, config)
            setAlerta({ msg: "Proyecto Creado Correctamente", erro: false })
            setProyectos([...proyectos, data])
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const obtenerProyecto = async (id) => {
        setCargando(true)
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get(`/proyectos/${id}`, config)
            setProyecto(data)
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            setAlerta({ msg: data.msg, error: false })
            //Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
            setTimeout(() => {
                navigate("/proyectos")
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    const submitTarea = async (tarea) => {
        if (tarea.id) {
            editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }

    }

    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post("/tareas", tarea, config)
            const proyectoActualizado = { ...proyecto, tareas: [...proyecto.tareas, data] }
            setProyecto(proyectoActualizado)
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
            const tareasActualizadas = { ...proyecto }
            tareasActualizadas.tareas = tareasActualizadas.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(tareasActualizadas)
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    return (
        <ProyectoContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormularioTarea,
            handleModalTarea,
            submitTarea,
            handleModalEditarTarea,
            tarea,
            handleModalEliminarTarea,
            modalEliminarTarea
        }}>
            {children}
        </ProyectoContext.Provider>
    )
}
