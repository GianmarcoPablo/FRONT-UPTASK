import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Header, Sidebar } from "../components"

export default function RutaProtegida() {
    const { auth, cargando } = useAuth()

    if (cargando) return

    return (
        <>
            {auth._id ? (
                <div className="bg-gray-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="flex-1 p-10 ">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to={"/"} />}
        </>
    )
}
