// AdminNavbar.tsx
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import UserIcon from '../assets/user-icon-green-1.png';
import ProfileInfo from './ProfileInfo';
import SendRequestModal from '../pages/client/client-requests/SendRequestModal';

const AdminNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false); // Nuevo estado para controlar el modal de perfil
  const [, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate('/login');
  }

  const handleProfileClick = () => {
    setShowProfileModal(true); // Muestra el modal de perfil
  };

  const closeProfileModal = () => {
    setShowProfileModal(false); // Cierra el modal de perfil
  };


  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item" onClick={() => toggleDropdown('farmacias')}>
          
          Pharmacies ▾
          {activeDropdown === 'farmacias' && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/pharmacies')}>View Pharmacies</li>
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => toggleDropdown('medicamentos')}>
          Products ▾
          {activeDropdown === 'medicamentos' && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/products')}>View Products</li>
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => toggleDropdown('solicitudes')}>
          Requests ▾
          {activeDropdown === 'solicitudes' && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/requests')}>View Requests</li>
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => navigate('/admin-home')}>
          Volver al Inicio
        </li>

        
      </ul>

      <div className="profile-icon" onClick={() => toggleDropdown('perfil')}>
        <img src={UserIcon} alt="" />
        {activeDropdown === 'perfil' && (
          <ul className="dropdown-menu">
            <li onClick={handleProfileClick}>Perfil</li>
            <li onClick={handleLogout}>Salir</li>
          </ul>
        )}
      </div>
      <SendRequestModal show={showModal} onClose={() => setShowModal(false)}></SendRequestModal>

      {/* Renderiza ProfileInfo si showProfileModal es true */}
      {showProfileModal && (
        <ProfileInfo closeModal={closeProfileModal} />
      )}  

    </nav>
  );
};

export default AdminNavbar;
