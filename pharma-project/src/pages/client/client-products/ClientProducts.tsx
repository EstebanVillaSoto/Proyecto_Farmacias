import { useContext, useEffect, useState } from 'react';
import SearchBar from "../../../components/SearchBar";
import ProductRow from "./ClientProductRow";
import Modal from './ModalInspectProduct';
import ClientNavbar from '../../../components/ClientNavbar';
import Title from '../../../components/ui/Title';
import { UserContext } from '../../../App';

export default function ClientProducts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [user] = useContext(UserContext)

    useEffect(() => {
        // Función para obtener productos de la API
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://pr-disenno-backend-production.up.railway.app/products/user/${user.id}`); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data); // Inicializa los productos filtrados
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filtrar productos cuando cambia el valor de búsqueda
        if (searchValue) {
            const results = products.filter(product =>
                product.only_name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products); // Si no hay búsqueda, mostrar todos los productos
        }
    }, [searchValue, products]);

    const openModal = async (product: any) => {
        try{
            const response = await fetch(`https://pr-disenno-backend-production.up.railway.app/products/${product.id}/user/${user.id}`);
            if (!response.ok) throw new Error('Failed to fetch product details');
            const detailedProduct = await response.json();
            setSelectedProduct(detailedProduct);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className='flex flex-col justify-start items-center w-full'>
            <ClientNavbar />
            <Title title="Medicamentos" green="1" className="p-5" />
            <SearchBar place_holder="Nombre del medicamento" filter={false} value={searchValue} onSearchChange={setSearchValue} />

            <div className="grid grid-cols-custom-1 gap-4 p-4 w-auto items-center text-green-1">
                <div className="col-span-1">Nombre</div>
                <div className="col-span-2">Presentación</div>
                <div className="col-span-2">Programa de puntos</div>
                <div className="col-span-2">Mi saldo</div>
            </div>

            <div className="flex flex-col gap-4 overflow-auto h-96">
                {/* Mapeamos sobre los productos filtrados */}
                {filteredProducts.map((product) => (
                    <ProductRow
                        key={product.id} // Asegúrate de que cada producto tiene un ID único
                        Name={product.only_name}
                        presentation={product.product_form}
                        belong_point_program={product.is_in_program ? "Sí" : "No"}
                        balance={product.points_count} // 
                        onViewDetails={() => openModal(product)}
                    />
                ))}
            </div>


            {/* Modal que solo se muestra si isModalOpen es true */}
            {selectedProduct && (
                <Modal
                    show={isModalOpen}
                    onClose={closeModal}
                    medicineName={selectedProduct.name}
                    pointsBalance={selectedProduct.points_count}
                    pointsForRedemption={selectedProduct.points_for_redemption ?? "Este producto no está en el programa de puntos"}
                    hasPointsProgram={selectedProduct.hasPointsProgram}
                    price={selectedProduct.price}
                    description={selectedProduct.description}
                />
            )}
        </div>
    );
}
