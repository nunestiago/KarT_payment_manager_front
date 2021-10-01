import React from 'react';
import './style.scss';
import '../../styles/alignments.scss';
import { Link, useLocation } from 'react-router-dom';
import logoWhite from '../../assets/logowhitefull.svg';
import homeIcon from '../../assets/home.svg';
import moneyIcon from '../../assets/money.svg';
import clientsIcon from '../../assets/clients.svg';
import Navbar from '../Navbar';

function Sidebar({ children }) {
  const location = useLocation();

  return (
    <div className="flex-row">
      <nav className="flex-column">
        <img
          className="cubos"
          src={logoWhite}
          alt="Logo branco Cubos Academy"
        />
        <div className="flex-column content">
          <Link
            to="/home"
            className={location.pathname.includes('/home') ? 'active' : ''}
          >
            <img src={homeIcon} alt="ícone home" />
            HOME
          </Link>
          <Link
            to="/cobrancas"
            className={location.pathname.includes('/cobrancas') ? 'active' : ''}
          >
            <img src={moneyIcon} alt="ícone home" />
            COBRANÇAS
          </Link>
          <Link
            to="/clientes"
            className={location.pathname.includes('/clientes') ? 'active' : ''}
          >
            <img src={clientsIcon} alt="ícone home" />
            CLIENTES
          </Link>
        </div>
        <div className="flex-row items-center content-center">
          <button className="btn-pink">Criar cobrança</button>
        </div>
      </nav>
      <div className="flex-column">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
