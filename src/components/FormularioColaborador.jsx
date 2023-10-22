import { useState } from "react"
import { useProyecto } from "../context/ProyectoProvider"
import Alerta from "./Alerta"

export default function FormularioColaborador() {

    const [datos, setDatos] = useState({
        email: ""
    })
    const { mostrarAlerta, alerta, submitColaborador } = useProyecto()

    const handleSubmit = e => {
        e.preventDefault()
        if (datos.email.trim() === "") {
            mostrarAlerta({
                msg: "El email es obligatorio",
                error: true
            })
            return
        }
        submitColaborador(datos)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='bg-white py-10 px-5 w-full  md:w-1/2 rounded-lg shadow'
            >
                {alerta.msg && <Alerta alerta={alerta} />}
                <div className='mb-5'>
                    <label
                        htmlFor="email"
                        className='text-gray-700 uppercase font-bold text-sm'
                    >
                        Email Colaborador
                    </label>
                    <input
                        type="email"
                        id='email'
                        placeholder='Email del usuario'
                        name='email'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={datos.email}
                        onChange={(e) => setDatos({
                            ...datos,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
                <input
                    type="submit"
                    className='bg-sky-600 hover:bg-sky-700 text-white w-full uppercase font-bold text-ellipsis p-3 cursor-pointer transition-colors rounded text-sm'
                    value={"Buscar Colaborador"}
                />
            </form>
        </>
    )
}
