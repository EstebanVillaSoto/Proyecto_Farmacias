// AdminNavbar.tsx
import React, { useState } from 'react';
import './Navbar.css';

const AdminNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item" onClick={() => toggleDropdown('farmacias')}>
          
          Farmacias ▾
          {activeDropdown === 'farmacias' && (
            <ul className="dropdown-menu">
              <li>Ver Farmacias</li>
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => toggleDropdown('medicamentos')}>
          Medicamentos ▾
          {activeDropdown === 'medicamentos' && (
            <ul className="dropdown-menu">
              <li>Ver Medicamentos</li>
              <li>Registrar Medicamentos</li>
            </ul>
          )}
        </li>

        <li className="navbar-item" onClick={() => toggleDropdown('solicitudes')}>
          Solicitudes ▾
          {activeDropdown === 'solicitudes' && (
            <ul className="dropdown-menu">
              <li>Ver Solicitudes</li>
            </ul>
          )}
        </li>
      </ul>

      <div className="profile-icon" onClick={() => toggleDropdown('perfil')}>
        <img src="path/to/profile-icon.png" alt="Perfil" />
        {activeDropdown === 'perfil' && (
          <ul className="dropdown-menu">
            <li>Perfil</li>
            <li>Salir</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
