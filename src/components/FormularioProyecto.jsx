import { useState } from "react"
import { useProyecto } from "../context/ProyectoProvider"
import Alerta from "./Alerta"

export default function FormularioProyecto() {

    const [datos, setDatos] = useState({
        nombre: "",
        descripcion: "",
        fechaEntrega: "",
        cliente: ""
    })
    const { mostrarAlerta, alerta, submitProyecto } = useProyecto()

    const handleSubmit = async e => {
        e.preventDefault()
        if (Object.values(datos).includes("")) {
            mostrarAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }
        await submitProyecto(datos)
        setDatos({
            nombre: "",
            descripcion: "",
            fechaEntrega: "",
            cliente: ""
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-xl'>
            {alerta.msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="nombre"
                >
                    Nombre Proyecto
                </label>
                <input
                    id='nombre'
                    type="text"
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Nombre del proyecto'
                    value={datos.nombre}
                    name="nombre"
                    onChange={(e) => setDatos({
                        ...datos,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>
            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="descripcion"
                >
                    Descripcion Proyecto
                </label>
                <textarea
                    id='descripcion'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-y h-28'
                    placeholder='Descripcion del proyecto'
                    value={datos.descripcion}
                    name="descripcion"
                    onChange={(e) => setDatos({
                        ...datos,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>
            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="fechaEntrega"
                >
                    Fecha Entrega
                </label>
                <input
                    id='fechaEntrega'
                    type="date"
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-y'
                    value={datos.fechaEntrega}
                    name="fechaEntrega"
                    onChange={(e) => setDatos({
                        ...datos,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>
            <div className="mb-5">
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="cliente"
                >
                    Nombre Cliente
                </label>
                <input
                    id='cliente'
                    type="text"
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-y'
                    placeholder="Nombre del cliente"
                    value={datos.cliente}
                    name="cliente"
                    onChange={(e) => setDatos({
                        ...datos,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>
            <input
                type="submit"
                value={"Crear Proyecto"}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}
