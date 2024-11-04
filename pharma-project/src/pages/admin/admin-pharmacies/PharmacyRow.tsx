import { useState } from "react";
import ButtonWithImage from "../../../components/ui/ButtonWithImage";
import EmergenteFarmacia from "./EmergenteFarmacia";
import InspectIcon from "../../../assets/inspect-icon-green-3.png";

type PharmacyRowProps = {
    pharmacy_id: number;
    pharmacy_name: string;
    pharmacy_email: string;
    pharmacyContact_number: string;
    pharmacy_address: string;
    pharmacy_schedule: string;
};

export default function PharmacyRow(props: PharmacyRowProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="grid grid-cols-custom-1 gap-4 bg-green-1 p-4 w-auto items-center text-green-3 rounded">
                <div className="col-span-2 overflow-hidden">{props.pharmacy_name}</div>
                <div className="col-span-2 overflow-hidden">{props.pharmacyContact_number}</div>
                <div className="col-span-3 overflow-hidden"></div>
                <div className="col-span-1 overflow-hidden">
                    
                    <ButtonWithImage image_name={InspectIcon} action={() => setShowModal(true)} />
                    
                    
                    
                </div>
            </div>
            {showModal && (
                <EmergenteFarmacia
                    name={props.pharmacy_name}
                    email={props.pharmacy_email}
                    phone_number={props.pharmacyContact_number}
                    address={props.pharmacy_address}
                    schedule={props.pharmacy_schedule}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
