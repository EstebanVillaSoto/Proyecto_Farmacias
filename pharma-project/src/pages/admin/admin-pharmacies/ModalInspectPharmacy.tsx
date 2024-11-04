/*

import { useState, useEffect } from "react";
import Title from "../../../components/ui/Title";
import DetailGrid from "./DetailGrid1";

const IMAGE_URL = 'src/assets/';

type ModalInspectRequestProps = {
    requestId: number;
    show: boolean;
    close: () => void;
};

export default function ModalInspectRequest(props: ModalInspectRequestProps) {
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.show) {
            fetchRequestDetails();
        } else {
            setRequest(null); // Reset request when modal is closed
        }
    }, [props.show]);

    const fetchRequestDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://pr-disenno-backend-production.up.railway.app/requests/${props.requestId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setRequest(data);
        } catch (error) {
            console.error("Error fetching request details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!props.show) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div onClick={props.close} className="fixed inset-0 z-10"></div>
            <div className="relative z-20 bg-green-3 rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <Title title="Request Details" green="1" className="mb-4" />
                {loading ? (
                    <strong className="text-green-1">Loading...</strong>
                ) : (
                    request && (
                        <div className="flex gap-5">
                            {/* Detalles del producto 
                            <div className="flex-grow">
                                <DetailGrid
                                    details={[
                                        ["Invoice ID:", request.invoice_id || "N/A"], 
                                        ["Purchase Date:", request.purchase_date || "N/A"],
                                        ["Request State:", request.request_state || "N/A"],
                                        ["Pharmacy:", request.pharmacy?.name || "N/A"] 
                                    ]}
                                />
                                <Title title="Product" green="1" className="pt-4" />
                                <DetailGrid
                                    details={[
                                        ["Name:", request.product?.name || "N/A"],
                                        ["Presentation:", request.product.product_form || "N/A"],
                                        ["Amount:", request.product_quantity || "N/A"],
                                        ["Potential point gain:", request.product?.points_per_purchase * request.product_quantity || "N/A"] 
                                    ]}
                                />
                            </div>
                            {/* Imagen *
                            <div className="flex-shrink-0 h-96 w-80 bg-cover bg-no-repeat bg-center rounded-lg shadow-md" style={{
                                backgroundImage: `url(${IMAGE_URL}factura-ejemplo.jpg)`
                            }}></div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
*/