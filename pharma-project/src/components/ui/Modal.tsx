type ModalProps = {
    onClose: () => void;
    children?: React.ReactNode;
    show: boolean;
};
export default function Modal(props: ModalProps) {
    if (!props.show)
        return null;
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div onClick={props.onClose} className="fixed inset-0 z-10"></div>
            <div className="flex flex-col z-20 bg-green-3 rounded-lg shadow-lg p-6 w-fit">
                {props.children}
            </div>
        </div>
    );
}
