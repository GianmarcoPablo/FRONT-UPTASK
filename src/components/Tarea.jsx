import { FormatearFecha } from "../helpers/FormatearFecha"
import { useProyecto } from "../context/ProyectoProvider"
import useAdmin from "../hooks/useAdmin"

export default function Tarea({ tarea }) {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyecto()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

    const admin = useAdmin()
    return (
        <div className='border-b md:p-5 flex justify-between items-center p-5'>
            <div className="flex flex-col items-start ">
                <p className='mb-1 text-xl font-bold'>{nombre}</p>
                <p className='mb-1 text-sm font-semibold text-gray-500 uppercase'>{descripcion}</p>
                <p className='mb-1 text-xl font-bold'>{FormatearFecha(fechaEntrega)}</p>
                <p className='mb-1 text-gray-600 font-semibold'>Prioridad: {prioridad}</p>
                {estado && <p className="text-sm bg-orange-500 font-bold uppercase py-1 px-2 rounded lg: text-white">Completada por: {tarea.completado.nombre} </p>}
            </div>
            <div className='flex flex-col lg:flex-row gap-2 '>

                {admin && (
                    <>
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
                    </>
                )}

                <button
                    className={`${estado ? 'bg-green-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold rounded-lg text-sm}`}
                    onClick={() => completarTarea(_id)}
                >
                    {estado ? 'Completada' : 'Incompleta'}
                </button>
            </div>
        </div>
    )
}
