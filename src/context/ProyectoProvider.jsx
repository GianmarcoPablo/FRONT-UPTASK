import { useContext, createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectoContext = createContext()

export const useProyecto = () => useContext(ProyectoContext)

export default function ProyectoProvider({ children }) {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
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
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProyectoContext.Provider value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto
        }}>
            {children}
        </ProyectoContext.Provider>
    )
}
