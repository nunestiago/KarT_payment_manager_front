import React from 'react';
import './style.scss';
import '../../styles/alignments.scss'
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logowhitefull.svg';
import homeIcon from '../../assets/home.svg';
import moneyIcon from '../../assets/money.svg';
import clientsIcon from '../../assets/clients.svg';

function Sidebar({ children }) {
  return (
    <nav className="flex-column">
      <img className="cubos" src={logoWhite} alt="Logo branco Cubos Academy" />
      <div className="flex-column content">
        <Link to="/home">
          <img src={homeIcon} alt="ícone home" />
          HOME
        </Link>
        <Link to="/cobrancas">
          <img src={moneyIcon} alt="ícone home" />
          COBRANÇAS
        </Link>
        <Link to="/clientes">
          <img src={clientsIcon} alt="ícone home" />
          CLIENTES
        </Link>
        </div>
        <div className="flex-row items-center content-center">
          <button className="btn-pink">Criar cobrança</button>
        </div>        
      
      {children}
    </nav>
  );
}

export default Sidebar;