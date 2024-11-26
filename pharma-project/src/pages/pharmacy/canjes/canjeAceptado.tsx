import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type CanjeAceptadoProps = {
    closeModal: () => void; // Función para cerrar el modal
    realizarOtroCanje: () => void; // Función para iniciar otro canje
    volverPaginaPrincipal: () => void; // Función para volver a la página principal
    onClose: () => void;
};

export default function CanjeAceptado({
    closeModal,
    realizarOtroCanje,
    volverPaginaPrincipal,
}: CanjeAceptadoProps) {
    const [numero] = useState<string | null>("200001"); // Número del canje (simulado)
    //const [loading, setLoading] = useState(false); // Estado de carga
    //const [error, setError] = useState<string | null>(null); // Estado de error
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
                    <h2 className="text-white text-2xl font-semibold">Canje Aceptado</h2>
                </div>

                {/* Cuerpo del modal */}
                <div className="bg-[#4A7669] p-6 text-white space-y-4">
                    
                        <div>
                            <p className="font-semibold">
                                ¡Canje fue aceptado! Número del canje es:
                            </p>
                            <p className="text-lg font-bold">{numero}</p>
                        </div>
                    
                </div>

                {/* Botones de acción */}
                <div className="bg-[#16423C] p-4 flex justify-around rounded-b-lg">
                    <button
                        onClick={realizarOtroCanje}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg text-sm"
                    >
                        <li onClick={() => navigate('/verCanjes')}>Realizar otro canje</li>
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
