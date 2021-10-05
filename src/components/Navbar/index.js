import React, { useState } from 'react';
import profileIcon from '../../assets/user.svg';
import editIcon from '../../assets/edit.svg';
import logoutIcon from '../../assets/logout.svg';
import './style.scss';
import useAuth from '../../hooks/useAuth';
import ModalEditUser from '../ModalEditUser';

function Navbar() {
  const [dropUserMenu, setDropUserMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { logout } = useAuth();

  function handleModal() {
    setDropUserMenu(!dropUserMenu);
    setOpenModal(!openModal);
  }

  return (
    <div className="profile" onMouseLeave={() => setDropUserMenu(false)}>
      <img
        src={profileIcon}
        alt="user-icon"
        onClick={() => setDropUserMenu(!dropUserMenu)}
        onMouseEnter={() => setDropUserMenu(true)}
      />
      {dropUserMenu && (
        <div
          className="user-menu"
          onMouseEnter={() => setDropUserMenu(true)}
          onMouseLeave={() => setDropUserMenu(false)}
        >
          <div onClick={() => handleModal()}>
            <img src={editIcon} alt="icone de editar" />
            <p> Editar </p>
          </div>

          <div onClick={logout}>
            <img src={logoutIcon} alt="icone de deslogar" />
            <p>Deslogar</p>
          </div>
        </div>
      )}
      {openModal && (
        <ModalEditUser openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default Navbar;
