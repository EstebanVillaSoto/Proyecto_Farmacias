import { useNavigate } from "react-router-dom";

type CanjeRechazadoProps = {
    closeModal: () => void; // Función para cerrar el modal
    volverAIntentar: () => void; // Función para reintentar el canje
    volverPaginaPrincipal: () => void; // Función para volver a la página principal
};

export default function CanjeRechazado({
    closeModal,
    volverAIntentar,
    volverPaginaPrincipal,
}: CanjeRechazadoProps) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative rounded-lg shadow-lg w-96 max-w-full bg-[#16423C]">
                {/* Botón de cierre */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-500"
                >
                    &times;
                </button>

                {/* Encabezado */}
                <div className="p-6 text-center">
                    <h2 className="text-white text-2xl font-semibold">Canje Rechazado</h2>
                </div>

                {/* Cuerpo del modal */}
                <div className="bg-[#4A7669] p-6 text-white space-y-4">
                    <div>
                        <p className="font-semibold">
                            ¡Canje fue rechazado! Verificar información nuevamente.
                        </p>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="bg-[#16423C] p-4 flex justify-around rounded-b-lg">
                    <button
                        onClick={volverAIntentar}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg text-sm"
                    >
                        <li onClick={() => navigate('/verCanjes')}>Volver a intentar</li>
                    </button>
                    <button
                        onClick={volverPaginaPrincipal}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg text-sm"
                    >
                        <li onClick={() => navigate('/pharmacy-home')}>Volver a la página principal</li>
                    </button>
                </div>
            </div>
        </div>
    );
}
