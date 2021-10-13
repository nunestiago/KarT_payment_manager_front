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
          <div className="home">
            <Link
              to="/home"
              className={location.pathname.includes('/home') ? 'active' : ''}
            >
              <img src={homeIcon} alt="ícone home" />
              HOME
            </Link>
          </div>
          <div className="cobrancas">
            <Link
              to="/cobrancas"
              className={
                location.pathname.includes('/cobrancas') ? 'active' : ''
              }
            >
              <img src={moneyIcon} alt="ícone money" />
              COBRANÇAS
            </Link>
          </div>
          <div className="clientes">
            <Link
              to="/clientes"
              className={
                location.pathname.includes('/clientes') ? 'active' : ''
              }
            >
              <img src={clientsIcon} alt="ícone clients" />
              CLIENTES
            </Link>
          </div>
        </div>
        <div className="flex-row items-center content-center">
          <Link to="/nova-cobranca">
            <button className="btn-pink">Criar cobrança</button>
          </Link>
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
