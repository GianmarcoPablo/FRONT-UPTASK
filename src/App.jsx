import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthLayout, RutaProtegida } from "./layout/index"
import { LoginPage, RegistrarPage, OlvidePasswordPage, NuevoPassword, ConfirmarCuentaPage, ProyectosPage, NuevoProyecto, Proyecto, EditarProyectoPage, NuevoColaborador } from "./pages/index"
import AuthProvider from "./context/AuthProvider"
import ProyectoProvider from "./context/ProyectoProvider"

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ProyectoProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<LoginPage />} />
                            <Route path="registrar" element={<RegistrarPage />} />
                            <Route path="olvide-password" element={<OlvidePasswordPage />} />
                            <Route path="olvide-password/:token" element={<NuevoPassword />} />
                            <Route path="confirmar/:id" element={<ConfirmarCuentaPage />} />
                        </Route>

                        <Route path="/proyectos" element={<RutaProtegida />}>
                            <Route index element={<ProyectosPage />} />
                            <Route path="crear-proyecto" element={<NuevoProyecto />} />
                            <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
                            <Route path=":id" element={<Proyecto />} />
                            <Route path="editar/:id" element={<EditarProyectoPage />} />
                        </Route>
                    </Routes>
                </ProyectoProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
