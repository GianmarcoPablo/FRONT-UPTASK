import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alerta } from "../components"
import clienteAxios from "../config/clienteAxios"
import { useAuth } from "../context/AuthProvider"

export default function LoginPage() {

    const [datos, setDatos] = useState({
        email: "",
        password: ""
    })
    const [alerta, setAlerta] = useState({})
    const navigate = useNavigate("")
    const { setAuth } = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        if (Object.values(datos).includes("")) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }
        try {
            const { data } = await clienteAxios.post("/usuarios/login", datos)
            setAlerta({})
            localStorage.setItem("token", data.token)
            setAuth(data)
            navigate("/proyectos")
        } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true })
        }
    }

    return (
        <>
            <h1 className='text-sky-600 font-black text-4xl md:text-6xl capitalize'>Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span> </h1>
            {alerta.msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit} className='my-10 bg-white shadow-xl rounded-lg p-10'>
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
                    />
                </div>
                <input
                    type='submit'
                    value={"Iniciar Sesión"}
                    className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/registrar"}>¿No tienes una cuenta? registrate</Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to={"/olvide-password"}>Olvide mi password?</Link>
            </nav>
        </>
    )
}
