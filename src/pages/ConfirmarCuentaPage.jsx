import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Alerta } from "../components"
import clienteAxios from "../config/clienteAxios"

export default function ConfirmarCuentaPage() {

    const [alerta, setAlerta] = useState({})
    const [confirmado, setConfirmado] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const { data } = await clienteAxios.get(`/usuarios/confirmar/${id}`)
                setAlerta({ msg: data.msg, error: false })
                setConfirmado(true)
            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true })
            }
        }
        confirmarCuenta()
    }, [])

    return (
        <div>
            <>
                <h1 className='text-sky-600 font-black text-4xl md:text-6xl capitalize'>Confirma tu cuenta y comienza a crear tus <span className='text-slate-700'>proyectos</span> </h1>
                <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                    {alerta.msg && <Alerta alerta={alerta} />}
                    {confirmado && (
                        <Link
                            className="block text-center my-5 text-slate-500 uppercase text-sm"
                            to={"/"}>Cuenta Valida Inicia Sesión</Link>
                    )}
                </div>
            </>
        </div>
    )
}
