import ButtonWithImage from "../../../components/ui/ButtonWithImage";
import InspectIcon from "../../../assets/inspect-icon-green-3.png";
import SeeIcon from "../../../assets/see-icon-green.png";

type UserRowProps = {
    id: string;
    name: string;
    onSeePoints: () => void;
    onSeeInfo: () => void;
};

export default function UserRow({ id, name, onSeePoints, onSeeInfo }: UserRowProps) {
    return (
        <div className="grid grid-cols-custom-1 gap-4 bg-green-1 p-4 w-auto items-center text-green-3">
            <div className="col-span-2 overflow-hidden">{id}</div>
            <div className="col-span-2 overflow-hidden">{name}</div>
            <div className="col-span-2 flex justify-center">
                <ButtonWithImage image_name={InspectIcon} action={onSeePoints} />
            </div>
            <div className="col-span-2 flex justify-center">
                <ButtonWithImage image_name={SeeIcon} action={onSeeInfo} />
            </div>
        </div>
    );
}