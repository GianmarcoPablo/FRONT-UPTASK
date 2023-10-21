import { FormatearFecha } from "../helpers/FormatearFecha"
import { useProyecto } from "../context/ProyectoProvider"

export default function Tarea({ tarea }) {

    const { handleModalEditarTarea, handleModalEliminarTarea } = useProyecto()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea
    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div>
                <p className='mb-1 text-xl font-bold'>{nombre}</p>
                <p className='mb-1 text-sm font-semibold text-gray-500 uppercase'>{descripcion}</p>
                <p className='mb-1 text-xl font-bold'>{FormatearFecha(fechaEntrega)}</p>
                <p className='mb-1 text-gray-600 font-semibold'>Prioridad: {prioridad}</p>
            </div>
            <div className='flex gap-2'>
                <button
                    className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm'
                    onClick={() => handleModalEditarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    className='bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm'
                    onClick={() => handleModalEliminarTarea(tarea)}
                >
                    Elimnar
                </button>
                {estado ? (
                    <button
                        className='bg-sky-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm'
                    >
                        Completa
                    </button>
                ) : (
                    <button
                        className='bg-gray-600 px-4 py-3 text-white uppercase font-bold rounded-lg text-sm'
                    >
                        Incompleta
                    </button>
                )}
            </div>
        </div>
    )
}
