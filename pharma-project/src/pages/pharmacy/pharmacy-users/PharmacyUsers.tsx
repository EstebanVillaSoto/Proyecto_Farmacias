import { useEffect, useState } from 'react';
import SearchBar from "../../../components/SearchBar";
import UserRow from "./UserRow";
import PharmacyNavbar from '../../../components/PharmacyNavbar';
import UserTradesModal from './UserTradesModal'; // Modal para ver información de canjes
import UserInfoModal from './UserInfoModal'; // Modal para ver más información del usuario

export default function PharmacyUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isViewExchangesModalOpen, setIsViewExchangesModalOpen] = useState(false);
    const [isViewInfoModalOpen, setIsViewInfoModalOpen] = useState(false);

    // Obtener los usuarios desde la API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://pr-disenno-backend-production.up.railway.app/users'); 
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Filtrar los usuarios en base al valor de búsqueda
    const filteredUsers = users.filter(user =>{
        const searchLower = searchValue.toLowerCase();
        return(
            user.id.toString().includes(searchLower)
        );
    });

    // Abrir modal de información de canjes
    const openViewExchangesModal = (user: any) => {
        setSelectedUser(user);
        setIsViewExchangesModalOpen(true);
    };

    const closeViewExchangesModal = () => {
        setIsViewExchangesModalOpen(false);
        setSelectedUser(null);
    };

    // Abrir modal de más información
    const openViewInfoModal = (user: any) => {
        setSelectedUser(user);
        setIsViewInfoModalOpen(true);
    };

    const closeViewInfoModal = () => {
        setIsViewInfoModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className='flex flex-col justify-start items-center w-full'>
            <PharmacyNavbar />
            <SearchBar
                place_holder="Identificación de usuario (Placeholder)"
                filter={false}
                onSearchChange={setSearchValue}
                value={searchValue}
            />

            <div className="grid grid-cols-custom-1 gap-4 p-4 w-auto items-center text-green-1">
                <div className="col-span-2">Identificación</div>
                <div className="col-span-2">Nombre</div>
                <div className="col-span-2">Ver información de canjes</div>
                <div className="col-span-2">Ver más información</div>
            </div>

            <div className="flex flex-col gap-4 overflow-auto h-96">
                {filteredUsers.map((user) => (
                    <UserRow
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        onSeePoints={() => openViewExchangesModal(user)}
                        onSeeInfo={() => openViewInfoModal(user)}
                    />
                ))}
            </div>

            {selectedUser && (
                <UserTradesModal
                    show={isViewExchangesModalOpen}
                    onClose={closeViewExchangesModal}
                    userId={selectedUser.id.toString()}
                    userName={selectedUser.name}
                />
            )}

            {selectedUser && (
                <UserInfoModal
                    show={isViewInfoModalOpen}
                    onClose={closeViewInfoModal}
                    userId={selectedUser.id}
                />
            )}
        </div>
    );
}
