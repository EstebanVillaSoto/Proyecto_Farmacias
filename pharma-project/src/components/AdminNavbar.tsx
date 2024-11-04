// AdminNavbar.tsx
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import UserIcon from '../assets/user-icon-green-1.png';

const AdminNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      </ul>

      <div className="profile-icon" onClick={() => toggleDropdown('perfil')}>
        
        {activeDropdown === 'perfil' && (
          <ul className="dropdown-menu">
            <li>Perfil</li>
            <li onClick={handleLogout}>Salir</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
