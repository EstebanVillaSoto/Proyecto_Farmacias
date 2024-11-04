import ButtonWithImage from "../../../components/ui/ButtonWithImage"
import InspectIcon from "../../../assets/inspect-icon-green-3.png";

type ProductRowProps = {
    Name: string,
    presentation: string,
    belong_point_program: string
    balance: string;
    onViewDetails: () => void;  // Prop para manejar la acción de abrir el modal
}

export default function ProductRow(props: ProductRowProps) {
    return (
        <div>
            <div className="grid grid-cols-custom-1 gap-4 bg-green-1 p-4 w-auto items-center text-green-3">
                <div className="col-span-1 overflow-hidden">{props.Name}</div>
                <div className="col-span-2 overflow-hidden">{props.presentation}</div>
                <div className="col-span-2 overflow-hidden">{props.belong_point_program}</div>
                <div className="col-span-2 overflow-hidden">{props.balance}</div>
                <div className="col-span-1 overflow-hidden">
                    <ButtonWithImage image_name={InspectIcon} action={props.onViewDetails} />
                    
                </div>
            </div>
        </div>

    )
}
