import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useProyecto } from "../context/ProyectoProvider"
import Busqueda from "./Busqueda"

export default function Header() {

    const { cerrarSesion } = useAuth()
    const { handleBuscador, buscador } = useProyecto()
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between items-center">
                <h2 className="text-4xl text-sky-600 font-black mb-4 md:mb-0">Uptask</h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button
                        type="button"
                        className="font-bold uppercase"
                        onClick={handleBuscador}
                    >
                        Buscar Proyecto
                    </button>
                    <Link to={"/proyectos"} className="font-bold uppercase">
                        Proyectos
                    </Link>
                    <button
                        onClick={cerrarSesion}
                        type="button" className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
                        Cerra Sesión
                    </button>
                    <Busqueda />
                </div>
            </div>
        </header>
    )
}
