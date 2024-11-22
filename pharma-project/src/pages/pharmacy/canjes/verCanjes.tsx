import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type PharmacyInfoProps = {
    clients: string[]; // Lista de clientes para el combobox
    products: string[]; // Lista de productos para el combobox
    pharmacy: string;
    closeModal: () => void;
};

export default function VerCanjes({
    clients = ['Juan Carlos Solano', 'María Pérez', 'Carlos Gómez'], 
    products = ['Tabcin', 'Aspirina', 'Ibuprofeno'], 
    pharmacy = "FarmaValue", 
    closeModal = () => console.log('Modal cerrado'), 
    
}: PharmacyInfoProps) {
    const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const [selectedClient, setSelectedClient] = useState<string>(
        clients.length > 0 ? clients[0] : ''
    );
    const [selectedProduct, setSelectedProduct] = useState<string>(
        products.length > 0 ? products[0] : ''
    );
    const [quantity, setQuantity] = useState<string>('1');

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-[#16423C] rounded-lg w-[400px] max-w-full shadow-lg p-6 relative">
                {/* Botón Cerrar */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
                >
                    &times;
                </button>

                {/* Encabezado */}
                <div className="p-6 text-center">
                    <h2 className="text-white text-2xl font-semibold">Canje</h2>
                </div>

                {/* Cuerpo del modal */}
                <div className="bg-[#4A7669] p-4 rounded-lg space-y-4">
                    {/* Fecha */}
                    <div>
                        <p className="text-sm font-medium text-gray-200">
                            Fecha de Registro de Canje:
                        </p>
                        <p className="text-base text-white font-semibold">
                            {formattedDate}
                        </p>
                    </div>

                    {/* Cliente */}
                    <div>
                        <p className="text-sm font-medium text-gray-200">Cliente:</p>
                        <select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            className="w-full p-2 rounded-md bg-[#16423C] text-white border border-gray-500 focus:outline-none focus:ring-2"
                        >
                            {clients.length > 0 ? (
                                clients.map((client, index) => (
                                    <option key={index} value={client}>
                                        {client}
                                    </option>
                                ))
                            ) : (
                                <option disabled value="">
                                    No hay clientes disponibles
                                </option>
                            )}
                        </select>
                    </div>

                    {/* Producto */}
                    <div>
                        <p className="text-sm font-medium text-gray-200">Producto:</p>
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full p-2 rounded-md bg-[#16423C] text-white border border-gray-500 focus:outline-none focus:ring-2"
                        >
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <option key={index} value={product}>
                                        {product}
                                    </option>
                                ))
                            ) : (
                                <option disabled value="">
                                    No hay productos disponibles
                                </option>
                            )}
                        </select>
                    </div>

                    {/* Cantidad */}
                    <div>
                        <p className="text-sm font-medium text-gray-200">Cantidad:</p>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full p-2 rounded-md bg-[#16423C] text-white border border-gray-500 focus:outline-none focus:ring-2"
                            min="1"
                        />
                    </div>

                    {/* Farmacia */}
                    <div>
                        <p className="text-sm font-medium text-gray-200">Farmacia:</p>
                        <p className="text-base text-white font-semibold">{pharmacy}</p>
                    </div>
                </div>

                {/* Botón Confirmar */}
                <div className="mt-4">
                    <button
                        onClick={() => navigate('/canjeAceptado')}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-colors"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
