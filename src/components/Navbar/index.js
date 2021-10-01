import React, { useState } from 'react';
import profileIcon from '../../assets/user.svg';
import editIcon from '../../assets/edit.svg';
import logoutIcon from '../../assets/logout.svg';
import './style.scss';
import useAuth from '../../hooks/useAuth';

function Navbar() {
  const [dropUserMenu, setDropUserMenu] = useState(false);
  const { logout } = useAuth();

  function handleModal() {
    setDropUserMenu(!dropUserMenu);
  }

  return (
    <div className="profile">
      <img src={profileIcon} alt="user-icon" />
      {dropUserMenu && (
        <div className="user-dropdown">
          <div onClick={handleModal}>
            <img src={editIcon} alt="icone de editar" />
            <p> Editar </p>
          </div>

          <div onClick={logout}>
            <img src={logoutIcon} alt="icone de deslogar" />
            <p>Deslogar</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
