import { useProyecto } from "../context/ProyectoProvider"
import { PreviewProyecto } from "../components";
import { Alerta } from "../components"

export default function ProyectosPage() {
    const { proyectos, alerta } = useProyecto()
    return (
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>
            {alerta.msg && <Alerta alerta={alerta} />}
            <div className="bg-white shadow mt-10 rounded-lg">
                {proyectos.length ? (
                    proyectos.map(proyecto => (
                        <PreviewProyecto
                            key={proyecto._id}
                            proyecto={proyecto} />
                    ))
                ) : <p className="text-center text-gray-700 uppercase p-5">No hay proyectos aún</p>}
            </div>
        </>
    )
}
