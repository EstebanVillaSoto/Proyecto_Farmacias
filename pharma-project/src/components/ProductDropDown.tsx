import { useEffect, useState } from "react";

type ProductDropDownProps = {
    handleChange: (ProductId: number) => void;
    is_in_program: string;
}
export default function ProductDropDown(props: ProductDropDownProps) {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        fetchRequestDetails();
    }, []);

    const fetchRequestDetails = async () => {
        try {
            const response = await fetch(
                `https://pr-disenno-backend-production.up.railway.app/products?is_in_program=${props.is_in_program}`
            );
            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching request details:", error);
        }
    };
    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const ProductId = Number(event.target.value);
        props.handleChange(ProductId); // Notifica al componente padre el ID seleccionado
    };
    return (
        <select
            name="pharmacies"
            onChange={handleSelectChange}
            className="font-bold bg-green-1 text-green-3 
                        placeholder:text-green-2 focus:outline-none w-full p-1 rounded"
        >
            {Products.map((product: any) => {
                return (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                );
            })}
        </select>
    );
}