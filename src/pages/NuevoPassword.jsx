import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import { Alerta } from "../components"

export default function NuevoPassword() {

    const { token } = useParams()
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordModificado, setPasswordModificado] = useState(false)
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const { data } = await clienteAxios.get(`/usuarios/olvide-password/${token}`)
                setAlerta({ msg: data.msg, error: false })
                setTokenValido(true)
            } catch (error) {
                setAlerta({ msg: error.response.data.msg, error: true })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        if (password === "") {
            setAlerta({ msg: "El password es obligatorio", error: true })
            return
        }
        if (password.length < 6) {
            setAlerta({ msg: "El password debe ser minimo de 6 caracteres", error: true })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
            setAlerta({ msg: data.msg })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }
    }

    return (
        <>
            <h1 className='text-sky-600 font-black text-4xl md:text-6xl capitalize'>Restablece tu password y no pierdas acceso a tus <span className='text-slate-700'>proyectos</span> </h1>
            {alerta.msg && <Alerta alerta={alerta} />}
            {tokenValido && (
                <form onSubmit={handleSubmit} className='my-10 bg-white shadow-xl rounded-lg p-10'>
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                            htmlFor="password">Nuevo Password</label>
                        <input
                            id='password'
                            type="password"
                            placeholder='Escribe tu nuevo password'
                            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type='submit'
                        value={"Guardar nuevo password"}
                        className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
                    />
                </form>
            )}
            {passwordModificado && (
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/"}>Cuenta Valida Inicia Sesión</Link>
            )}
        </>
    )
}
