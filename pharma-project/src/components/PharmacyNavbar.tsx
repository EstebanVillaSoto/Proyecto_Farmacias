import React, { useContext, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
//import SendRequestModal from '../pages/client/client-requests/SendRequestModal';
import { UserContext } from '../App';
import UserIcon from '../assets/user-icon-green-1.png';
import ProfileInfo from './ProfileInfo'; // Importa ProfileInfo

const PharmacyNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  //const [showModal, setShowModal] = useState<boolean>(false);
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
  };

  const handleProfileClick = () => {
    setShowProfileModal(true); // Muestra el modal de perfil
  };

  const closeProfileModal = () => {
    setShowProfileModal(false); // Cierra el modal de perfil
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item" onClick={() => toggleDropdown('usuarios')}>
          Usuarios ▾
          {activeDropdown === 'usuarios' && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/requests')}>Ver Usuarios</li> {/* Cambiar a Ver Usuarios */}
              {/*<li onClick={() => setShowModal(true)}>Send points request</li>*/}
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => toggleDropdown('canjes')}>
          Canjes ▾
          {activeDropdown === 'canjes' && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/verCanjes')}>Crear Canjes</li>
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => navigate('/pharmacy-home')}>
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

      {/*<SendRequestModal show={showModal} onClose={() => setShowModal(false)}></SendRequestModal>*/}

      {/* Renderiza ProfileInfo si showProfileModal es true */}
      {showProfileModal && (
        <ProfileInfo closeModal={closeProfileModal} />
      )}
    </nav>
  );
};

export default PharmacyNavbar;
