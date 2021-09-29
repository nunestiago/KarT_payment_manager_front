import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logowhitefull.svg';
import homeIcon from '../../assets/home.svg';
import moneyIcon from '../../assets/money.svg';
import clientsIcon from '../../assets/clients.svg';

function Sidebar({ children }) {
  return (
    <nav>
      <img src={logoWhite} alt="Logo branco Cubos Academy" />
      <div>
        <Link to="/home">
          <img src={homeIcon} alt="ícone home" />
          Home
        </Link>
        <Link to="/cobrancas">
          <img src={moneyIcon} alt="ícone home" />
          Cobranças
        </Link>
        <Link to="/clientes">
          <img src={clientsIcon} alt="ícone home" />
          Clientes
        </Link>
        <button>Criar cobrança</button>
      </div>
      {children}
    </nav>
  );
}

export default Sidebar;
