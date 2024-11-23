import { useEffect, useState } from "react";

interface UserTradesModalProps {
    show: boolean;
    onClose: () => void;
    userId: string;
    userName: string;
}

interface Trade {
    id: number;
    product: string;
    quantity: number;
    date_of_trade: string;
    points_used: number;
}

export default function UserTradesModal({ show, onClose, userId, userName }: UserTradesModalProps) {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!show) return;

        const fetchTrades = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://pr-disenno-backend-production.up.railway.app/trades/user/${userId}`);
                if (!response.ok) throw new Error("Error al obtener los canjes");
                const data = await response.json();
                setTrades(data);
            } catch (error) {
                console.error("Error fetching trades:", error);
                setTrades([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrades();
    }, [show, userId]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#16423C] rounded-lg shadow-lg p-6 w-[90%] md:w-[60%] max-h-[80%] overflow-y-auto">
                {/* Encabezado */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-green-200">Canjes de {userName}</h2>
                    <button
                        className="text-green-200 text-xl font-bold hover:text-green-400"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {/* Encabezado de la tabla */}
                <div className="grid grid-cols-4 gap-4 text-green-200 text-sm font-medium p-2 bg-[#16423C] rounded-md">
                    <div>Número de canje</div>
                    <div>Medicamento</div>
                    <div>Cantidad</div>
                    <div>Fecha de canje</div>
                </div>

                {/* Contenido */}
                {isLoading ? (
                    <div className="text-center text-green-200 mt-4">Cargando canjes...</div>
                ) : trades.length > 0 ? (
                    trades.map((trade) => (
                        <div
                            key={trade.id}
                            className="grid grid-cols-4 gap-4 text-green-3 text-sm p-2 bg-green-1 rounded-md mt-2 hover:ring-2 hover:ring-green-400"
                        >
                            <div>{trade.id}</div>
                            <div>{trade.product}</div>
                            <div>{trade.quantity}</div>
                            <div>{new Date(trade.date_of_trade).toLocaleDateString()}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-green-200 mt-4">No hay canjes registrados.</div>
                )}
            </div>
        </div>
    );
}
