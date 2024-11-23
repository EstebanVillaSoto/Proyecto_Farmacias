// import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ProductDropDown from '../../../components/ProductDropDown';
import UserDropDown from '../../../components/UserDropDown';
import { UserContext } from '../../../App';

type PharmacyInfoProps = {
    pharmacy: string;
    closeModal: () => void;
};

export default function RegistrarCanjeModal(props: PharmacyInfoProps) {
    const [user, ] = useContext(UserContext);
    // const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const [selectedClient, setSelectedClient] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [quantity, setQuantity] = useState<string>('1');

    function handleSubmit() {
        // Enviar datos a la API
        if (selectedClient === "" || selectedProduct === "" || quantity === "") {
            alert('Faltan datos');
            return;
        }
        console.log('Cliente:', selectedClient);
        console.log('Producto:', selectedProduct);
        console.log('Cantidad:', quantity);
        console.log('Farmacia:', user.pharmacy_id);
        // Mostrar mensaje acorde si la petición fue exitosa o no
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-[#16423C] rounded-lg w-[400px] max-w-full shadow-lg p-6 relative">
                {/* Botón Cerrar */}
                <button
                    onClick={props.closeModal}
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
                        <UserDropDown handleChange={(userId) => setSelectedClient(userId.toString())}></UserDropDown>
                    </div>

                    {/* Producto */}
                    <div>
                        <p className="text-sm font-medium text-gray-200">Producto:</p>
                        <ProductDropDown handleChange={(productId) => setSelectedProduct(productId.toString())} is_in_program={'True'}></ProductDropDown>
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
                        <p className="text-base text-white font-semibold">{props.pharmacy}</p>
                    </div>
                </div>

                {/* Botón Confirmar */}
                <div className="mt-4">
                    <button
                        onClick={() => handleSubmit()}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition-colors"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
