import { useState } from "react"
import { Link } from "react-router-dom"
import { Alerta } from "../components"
import clienteAxios from "../config/clienteAxios"

export default function RegistrarPage() {

    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        password: ""
    })
    const [rptPassword, setRptPassword] = useState("")
    const [alerta, setAlerta] = useState({})
    const [envioEnProgreso, setEnvioEnProgreso] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()

        if (envioEnProgreso) {
            return
        }
        setEnvioEnProgreso(true)

        if (!Object.values(datos).every(value => value)) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true });
            setEnvioEnProgreso(false)
            return;
        }
        if (datos.password.length < 6) {
            setAlerta({ msg: "El password debe tener mas de 6 caracteres", error: true })
            setEnvioEnProgreso(false)
            return
        }
        if (datos.password !== rptPassword) {
            setAlerta({ msg: "Password diferentes", error: true })
            setEnvioEnProgreso(false)
            return
        }
        try {
            const { data } = await clienteAxios.post(`/usuarios`, datos)
            setAlerta({ msg: data.msg, error: false })
            setDatos({
                nombre: "",
                email: "",
                password: ""
            })
            setRptPassword("")
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        } finally {
            setEnvioEnProgreso(false)
        }
    }

    return (
        <>
            <h1 className='text-sky-600 font-black text-4xl md:text-6xl capitalize'>Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span> </h1>
            {alerta.msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit} className='my-10 bg-white shadow-xl rounded-lg p-10'>
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor="text">Nombre</label>
                    <input
                        id='text'
                        type="text"
                        placeholder='Tú Nombre'
                        className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                        name="nombre"
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]: e.target.value
                        })}
                        value={datos.nombre}
                    />
                </div>
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor="email">Email</label>
                    <input
                        id='email'
                        type="email"
                        placeholder='Email de Registro'
                        className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                        name="email"
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]: e.target.value
                        })}
                        value={datos.email}
                    />
                </div>
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor="password">Password</label>
                    <input
                        id='password'
                        type="password"
                        placeholder='Password de Registro'
                        className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                        name="password"
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]: e.target.value
                        })}
                        value={datos.password}
                    />
                </div>
                <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor="rptPassword">Repetir Password</label>
                    <input
                        id='rptPassword'
                        type="password"
                        placeholder='Repite tu password'
                        className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                        value={rptPassword}
                        onChange={(e) => setRptPassword(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value={"Crear Cuenta"}
                    className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/"}>¿Ya tienes uan cuenta? Inicia sesión</Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/olvide-password"}>Olvide mi password?</Link>
            </nav>
        </>
    )
}
