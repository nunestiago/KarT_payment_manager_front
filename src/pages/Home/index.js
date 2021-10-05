import React from 'react';
import './style.scss';
import clientsIcon from '../../assets/clients.svg';
import moneyIcon from '../../assets/money.svg';

function Home() { 
  return (
    <div className="home">
      <div className="flex-row">
        <div className="flex-column clients container-box">
          <div className="flex-row content-center items-center topline">
            <img src={clientsIcon} alt="clients-icon" />
            <h1>Clientes</h1>
          </div>
          <div className=" flex-column data items-center">
            <div className="flex-row green-box items-center">
              <h2>Em dia</h2>
              <span>{clientDebt?.true || 0}</span>
            </div>
            <div className="flex-row red-box items-center">
              <h2>Inadimplentes</h2>
              <span>{clientDebt?.false || 0}</span>
            </div>
          </div>
        </div>
        <div className="flex-column container-box charges">
          <div className="flex-row content-center items-center topline">
            <img src={moneyIcon} alt="money-icon" />
            <h1>Cobranças</h1>
          </div>
          <div className="flex-column data items-center">
            <div className="flex-row blue-box items-center">
              <h2>Previstas</h2>
              <span>0</span>
            </div>
            <div className="flex-row red-box items-center">
              <h2>Vencidas</h2>
              <span>0</span>
            </div>
            <div className="flex-row green-box items-center">
              <h2>Pagas</h2>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
