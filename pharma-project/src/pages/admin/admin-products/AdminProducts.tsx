import { useEffect, useState } from 'react';
import SearchBar from "../../../components/SearchBar";
import ProductRow from "./ProductRow";
import Modal from './ModalInspectProduct';
import ModalRegisterProgram from './ModalRegisterProgram';
import AdminNavbar from '../../../components/AdminNavbar';
import Title from '../../../components/ui/Title';

export default function AdminProducts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://pr-disenno-backend-production.up.railway.app/products/'); // Cambia esto por la URL de tu API
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const openModal = async(product: any) => {
        try{
            const response = await fetch(`https://pr-disenno-backend-production.up.railway.app/products/${product.id}`);
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

    const handleUpdateProduct = (updatedProduct: any) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div className='flex flex-col justify-start items-center w-full'>
            <AdminNavbar />
            <Title title="Products" green='1' className='p-5' />
            <SearchBar place_holder="Nombre del medicamento" filter={false} onSearchChange={setSearchValue} value={searchValue} />

            <div className="grid grid-cols-custom-1 gap-4 p-4 w-auto items-center text-green-1">
                <div className="col-span-1">Nombre</div>
                <div className="col-span-2">Presentación</div>
                <div className="col-span-2">Pertenece al programa de puntos</div>
            </div>

            <div className="flex flex-col gap-4 overflow-auto h-96">
                {products.filter(product => product.only_name.toLowerCase().includes(searchValue.toLowerCase())).map(product => (
                    <ProductRow
                        key={product.id}
                        Name={product.only_name}
                        presentation={product.product_form}
                        belong_point_program={product.is_in_program ? "Sí" : "No"} // Lógica para el programa de puntos
                        onViewDetails={() => openModal(product)}          
                    />
                ))}
            </div>

            {selectedProduct && (
                <Modal
                    show={isModalOpen}
                    onClose={closeModal}
                    medicineName={selectedProduct.name}
                    hasPointsProgram={selectedProduct.is_in_program}
                    price={selectedProduct.price}
                    pointsPerPurchase={selectedProduct.points_per_purchase}
                    pointsForRedemption={selectedProduct.points_for_redemption}
                    description={selectedProduct.description}
                    onRegisterPointsProgram={openRegisterModal}
                />
            )}

            {selectedProduct && (
                <ModalRegisterProgram
                    show={isRegisterModalOpen}
                    onClose={closeRegisterModal}
                    productId={selectedProduct.id}
                    medicineName={selectedProduct.name}
                    presentation={selectedProduct.presentation}
                    onUpdate={handleUpdateProduct}
                />
            )}
        </div>
    );
}
