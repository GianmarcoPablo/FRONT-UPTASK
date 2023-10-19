import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export default function Header() {

    const { cerrarSesion } = useAuth()
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between items-center">
                <h2 className="text-4xl text-sky-600 font-black">Uptask</h2>
                <input
                    type="search"
                    placeholder="Buscar proyecto"
                    className="rounded-lg lg:w-96 border-sky-900 focus:outline-none  border p-2"
                />
                <div className="flex items-center gap-4">
                    <Link to={"/proyectos"} className="font-bold uppercase">
                        Proyectos
                    </Link>
                    <button
                        onClick={cerrarSesion}
                        type="button" className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
                        Cerra Sesión
                    </button>
                </div>
            </div>
        </header>
    )
}
