import React, { useState } from 'react';
import profileIcon from '../../assets/user.svg';
import editIcon from '../../assets/edit.svg';
import logoutIcon from '../../assets/logout.svg';
import './style.scss';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router';
import ModalEditUser from '../ModalEditUser';

function Navbar() {
  const [dropUserMenu, setDropUserMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();

  function handleModal() {
    setDropUserMenu(!dropUserMenu);
    setOpenModal(!openModal);
  }

  return (
    <div className="profile">
      <img
        src={profileIcon}
        alt="user-icon"
        onClick={() => setDropUserMenu(!dropUserMenu)}
      />
      {dropUserMenu && (
        <div className="user-menu">
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
