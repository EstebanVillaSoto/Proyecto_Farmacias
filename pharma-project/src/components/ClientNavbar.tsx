// AdminNavbar.tsx
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import SendRequestModal from '../pages/client/client-requests/SendRequestModal';
import { UserContext } from '../App';
import UserIcon from '../assets/user-icon-green-1.png';

const ClientNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
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
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item" onClick={() => toggleDropdown('farmacias')}>
          
          Requests ▾
          {activeDropdown === 'farmacias' && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate('/requests')}>View Requests</li>
              <li onClick={() => setShowModal(true)}>Send points request</li>
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

        
      </ul>

      <div className="profile-icon" onClick={() => toggleDropdown('perfil')}>
        <img src={UserIcon} alt="" />
        {activeDropdown === 'perfil' && (
          <ul className="dropdown-menu">
            <li>Perfil</li>
            <li onClick={handleLogout}>Salir</li>
          </ul>
        )}
      </div>
      <SendRequestModal show={showModal} onClose={() => setShowModal(false)}></SendRequestModal>
    </nav>
  );
};

export default ClientNavbar;
