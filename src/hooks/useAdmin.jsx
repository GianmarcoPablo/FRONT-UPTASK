import { useProyecto } from "../context/ProyectoProvider"
import { useAuth } from "../context/AuthProvider"

export default function useAdmin() {

    const { proyecto } = useProyecto()
    const { auth } = useAuth()

    return proyecto.creador === auth._id
}

