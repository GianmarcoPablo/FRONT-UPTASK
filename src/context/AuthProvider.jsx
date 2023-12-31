import { useContext, createContext, useState, useEffect } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    const { pathname } = useLocation()
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios.get(`/usuarios/perfil`, config)
                setAuth(data)
                if (pathname === "/") {
                    navigate("/proyectos")
                }
            } catch (error) {
                setAuth({})
            } finally {
                setCargando(false)
            }
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{
            setAuth,
            auth,
            cargando,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}
