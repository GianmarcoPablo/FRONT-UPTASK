import { useProyecto } from "../context/ProyectoProvider"

export default function Colaborador({ colaborador }) {
    const { handleModalEliminarColaborador } = useProyecto()
    const { email, nombre, _id } = colaborador
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p>{email}</p>
            </div>
            <div>
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => handleModalEliminarColaborador(colaborador)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}
