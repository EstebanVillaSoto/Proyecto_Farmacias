import axios from "axios";

import DetailGrid from "../../../components/DetailGrid";
import Modal from "../../../components/ui/Modal";
import Title from "../../../components/ui/Title";
import ProductStatsRow from "./ProductStatsOfUserRow";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: "https://pr-disenno-backend-production.up.railway.app/"
});
type UserInfoModalProps = {
    show: boolean;
    onClose: () => void;
    userId: number;
};

export default function UserInfoModal(props: UserInfoModalProps) {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        api.get(`/users/${props.userId}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                alert("Error al cargar la información del usuario");
                console.log(error);
            });
    }, []);

    return (
        user && <Modal show={props.show} onClose={props.onClose}>
            <div className="flex gap-3">
                <div className="flex flex-col p-3">
                    <Title title={user.name} green="1"></Title>
                    <DetailGrid
                        details={[
                            ["Identificación:", user.identification],
                            ["Correo Electrónico", user.email],
                        ]}
                    ></DetailGrid>
                    <Title title="Estadísticas generales" green="1"></Title>
                    <DetailGrid
                        details={[
                            ["Total de productos adquiridos:", user.stats.total_trades || 0],
                            ["Total de puntos globales acumulados:", user.stats.total_points || 0],
                            ["Puntos usados en canje:", user.stats.used_points || 0],
                            ["Puntos disponibles:", user.stats.total_points || 0],
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
                        {
                            Object.keys(user.stats_per_product).map((key) => {
                                return (
                                    <ProductStatsRow
                                        key={key}
                                        name={key}
                                        available_points={user.stats_per_product[key].available_points}
                                        used_points={user.stats_per_product[key].used_points}
                                        total_points={user.stats_per_product[key].total_points}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}
