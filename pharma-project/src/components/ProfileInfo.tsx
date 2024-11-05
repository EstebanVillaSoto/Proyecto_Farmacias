//import React, { useEffect, useState } from 'react';

import { useEffect, useState } from "react";

interface ProfileProps {
    closeModal: () => void;
}

interface UserInfo {
    name: string;
    identification: string;
    email: string;
}

export default function ProfileInfo({ closeModal }: ProfileProps) {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        // Obtener el usuario de sessionStorage
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser)); // Parsea y guarda el usuario en el estado
        }
    }, []); 

    if (!userInfo) {
        return <p className="text-white">Cargando información del usuario...</p>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative rounded-lg shadow-lg w-96 max-w-full">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-gray-500"
                >
                    &times;
                </button>

                <div className="bg-[#16423C] p-6 text-center rounded-t-lg">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center">
                        {/* Puedes agregar un ícono o imagen aquí */}
                    </div>
                    <h2 className="text-white text-xl font-semibold mt-4">{userInfo.name}</h2>
                </div>

                <div className="bg-[#4A7669] p-4">
                    <h4 className="text-white text-lg font-semibold mb-2">Información:</h4>
                    <div className="flex justify-between text-white">
                        <p className="font-semibold text-lg">Correo:</p>
                        <p>{userInfo.email}</p>
                    </div>
                    <div className="flex justify-between text-white mt-1">
                        <p className="font-semibold text-lg">Identificación:</p>
                        <p>{userInfo.identification}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
