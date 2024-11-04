import { useState } from "react";
import ButtonWithImage from "../../../components/ui/ButtonWithImage"
import InspectRequests from "./InspectRequests";
import InspectIcon from "../../../assets/inspect-icon-green-3.png";

type RequestRowProps = {

    request_id: string;

    invoice_id: string;

    product_name: string;

    request_state: string;

    client_name: string;

};

export default function RequestRowAdmin(props: RequestRowProps) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div>
            <div className="grid grid-cols-custom-1 gap-4 bg-green-1 p-4 w-auto items-center text-green-3 rounded">
                <div className="col-span-1 overflow-hidden">{props.invoice_id}</div>
                <div className="col-span-1 overflow-hidden">{props.product_name}</div>
                <div className="col-span-1 overflow-hidden">{props.request_state}</div>
                <div className="col-span-1 overflow-hidden">{props.client_name}</div>
                <div className="col-span-3 overflow-hidden">{}</div>
                 {/* Espacio vacío para relleno */}
                <div className="col-span-1 overflow-hidden">
                    <ButtonWithImage image_name={InspectIcon} action={() => setShowModal(true)} />
                </div>
            </div>
            <InspectRequests
                requestId={Number(props.request_id)}
                show={showModal}
                close={() => setShowModal(false)}
            />
            </div>
        </>
    )
}
