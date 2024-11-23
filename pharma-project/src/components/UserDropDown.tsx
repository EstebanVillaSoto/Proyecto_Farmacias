import { useEffect, useState } from "react";

type UserDropDownProps = {
    handleChange: (userId: number) => void;
}

export default function UserDropDown(props: UserDropDownProps) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                `https://pr-disenno-backend-production.up.railway.app/users`
            );
            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
            let data = await response.json();
            data = data.filter((user: { is_admin: boolean; is_pharmacy: boolean; }) => user.is_admin === false || user.is_pharmacy === null);
            
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const userId = Number(event.target.value);
        props.handleChange(userId); // Notifica al componente padre el ID seleccionado
    };
    return (
        <select
            name="users"
            onChange={handleSelectChange}
            className="font-bold bg-green-1 text-green-3 
                        placeholder:text-green-2 focus:outline-none w-full p-1 rounded"
        >
            {users.map((user: any) => {
                return (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                );
            })}
        </select>
    );
}
