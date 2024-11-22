import DetailGrid from "../../../components/DetailGrid";
import Modal from "../../../components/ui/Modal";
import Title from "../../../components/ui/Title";
import ProductStatsRow from "./ProductStatsRow";

type UserInfoModalProps = {
    show: boolean;
    onClose: () => void;
};

export default function UserInfoModal(props: UserInfoModalProps) {
    return (
        <Modal show={props.show} onClose={props.onClose}>
            <div className="flex gap-3">
                <div className="flex flex-col p-3">
                    <Title title="Henry Castro" green="1"></Title>
                    <DetailGrid
                        details={[
                            ["Identificación:", "12312312312"],
                            ["Correo Electrónico", "henry@gmail.com"],
                        ]}
                    ></DetailGrid>
                    <Title title="Estadísticas generales" green="1"></Title>
                    <DetailGrid
                        details={[
                            ["Total de productos adquiridos:", "23"],
                            ["Total de puntos globales acumulados:", "1000"],
                            ["Puntos usados en canje:", "408"],
                            ["Puntos disponibles:", "592"],
                        ]}
                    ></DetailGrid>
                </div>
                <div className="flex flex-col p-3 flex-shrink-0">
                    <Title title="Medicamentos" green="1"></Title>
                    <div className="grid grid-cols-4 gap-4 p-4 w-auto items-center text-green-1 rounded">
                        <div className="overflow-hidden">Nombre</div>
                        <div className="overflow-hidden">
                            Puntos Disponibles
                        </div>
                        <div className="overflow-hidden">
                            Puntos Usados
                        </div>
                        <div className="overflow-hidden">
                            Total
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 overflow-auto h-96">
                        {/* Ponme unos 10 de estos con datos random */}
                        <ProductStatsRow
                            name="Producto 1"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 2"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 3"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 4"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 5"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 6"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 7"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 8"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 9"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                        <ProductStatsRow
                            name="Producto 10"
                            available_points={100}
                            used_points={50}
                            total_points={150}
                        ></ProductStatsRow>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
