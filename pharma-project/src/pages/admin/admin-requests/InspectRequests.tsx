import { useState, useEffect } from "react";
import Title from "../../../components/ui/Title";
import Modal from "../../../components/ui/Modal";
import DetailGrid from "../../../components/DetailGrid";


type ModalInspectRequestProps = {
    requestId: number;
    show: boolean;
    close: () => void;
};

export default function InspectRequests(props: ModalInspectRequestProps) {
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
            const response = await fetch(
                `https://pr-disenno-backend-production.up.railway.app/requests/${props.requestId}`
            );
            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
            const data = await response.json();
            setRequest(data);
        } catch (error) {
            console.error("Error fetching request details:", error);
        } finally {
            setLoading(false);
        }
    };
    const acceptRequest = async () => {
        const response = await fetch(
            `https://pr-disenno-backend-production.up.railway.app/requests/${props.requestId}/state`,

            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    request_state: "Accepted",
                }),
            }
        );
        if (response.ok) {
            alert("Request accepted successfully");
            props.close();
        } else {
            alert("Error accepting request");
        }
    };
    const rejectRequest = async () => {
        const response = await fetch(
            `https://pr-disenno-backend-production.up.railway.app/requests/${props.requestId}/state`,

            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    request_state: "Rejected",
                }),
            }
        );
        if (response.ok) {
            alert("Request rejected successfully");
            props.close();
        } else {
            alert("Error rejecting request");
        }
    };

    return (
        <Modal show={props.show} onClose={props.close}>
            <Title title="Request Details" green="1" className="mb-4" />
            {loading ? (
                <strong className="text-green-1 text-xl">Loading...</strong>
            ) : (
                request && (
                    <div className="flex gap-5">
                        {/* Detalles del producto */}
                        <div className="flex-grow">
                            <DetailGrid
                                details={[
                                    [
                                        "Invoice ID:",
                                        request.invoice_id || "N/A",
                                    ],
                                    [
                                        "Purchase Date:",
                                        request.purchase_date || "N/A",
                                    ],
                                    [
                                        "Request State:",
                                        request.request_state || "N/A",
                                    ],
                                    [
                                        "Pharmacy:",
                                        request.pharmacy?.name || "N/A",
                                    ],
                                ]}
                            />
                            <Title title="Product" green="1" className="pt-4" />
                            <DetailGrid
                                details={[
                                    ["Name:", request.product?.name || "N/A"],
                                    [
                                        "Presentation:",
                                        request.product.product_form || "N/A",
                                    ],
                                    [
                                        "Amount:",
                                        request.product_quantity || "N/A",
                                    ],
                                    [
                                        "Potential point gain:",
                                        request.product?.points_per_purchase *
                                            request.product_quantity || "N/A",
                                    ],
                                ]}
                            />
                            <Title
                                title="Applicant"
                                green="1"
                                className="pt-4"
                            />
                            <DetailGrid
                                details={[
                                    ["Name:", request.product?.name || "N/A"],
                                    [
                                        "ID:",
                                        request.product.product_form || "N/A",
                                    ],
                                ]}
                            />
                        </div>
                        {/* Imagen */}
                        <div
                            className="flex-shrink-0 h-96 w-80 bg-cover bg-no-repeat bg-center rounded-lg shadow-md"
                            style={{
                                backgroundImage: `url(${request.invoice_image})`,
                            }}
                        ></div>
                    </div>
                )
            )}
            {/* Botones Aceptar y Rechazar */}
            {request && request.request_state === "Pending" && (
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        onClick={rejectRequest}
                        className="bg-red-500 text-white p-2 rounded"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={acceptRequest}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Aceptar
                    </button>
                </div>
            )}
        </Modal>
    );
}
