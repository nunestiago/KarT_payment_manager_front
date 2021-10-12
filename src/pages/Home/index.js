import React, { useEffect, useState } from 'react';
import './style.scss';
import clientsIcon from '../../assets/clients.svg';
import moneyIcon from '../../assets/money.svg';
import baseUrl from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

function Home() {
  const { token } = useAuth();
  const [homeInfo, setHomeInfo] = useState();

  const handleClientsInfo = async () => {
    try {
      const response = await fetch(`${baseUrl}charges/homeInfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const dados = await response.json();

      if (!response.ok) {
        toast.error(dados);
        return;
      }

      setHomeInfo(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleClientsInfo();
  }, []);

  return (
    <div className="home">
      <div className="flex-row">
        <div className="flex-column clients container-box">
          <div className="flex-row content-center items-center topline">
            <img src={clientsIcon} alt="clients-icon" />
            <h1>Clientes</h1>
          </div>
          <div className=" flex-column data items-center">
            <Link to="/relatorios?relatorio=emdia">
              <div className="flex-row green-box items-center">
                <h2>Em dia</h2>
                <span>{homeInfo?.emDia || 0}</span>
              </div>
            </Link>
            <Link to="/relatorios?relatorio=inadimplente">
              <div className="flex-row red-box items-center">
                <h2>Inadimplentes</h2>
                <span>{homeInfo?.inadimplente || 0}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-column container-box charges">
          <div className="flex-row content-center items-center topline">
            <img src={moneyIcon} alt="money-icon" />
            <h1>Cobranças</h1>
          </div>
          <div className="flex-column data items-center">
            <Link to="/relatorios?relatorio=previstas">
              <div className="flex-row blue-box items-center">
                <h2>Previstas</h2>
                <span>{homeInfo?.previstas || 0}</span>
              </div>
            </Link>
            <Link to="/relatorios?relatorio=vencidas">
              <div className="flex-row red-box items-center">
                <h2>Vencidas</h2>
                <span>{homeInfo?.vencidas || 0}</span>
              </div>
            </Link>
            <Link to="/relatorios?relatorio=pagas">
              <div className="flex-row green-box items-center">
                <h2>Pagas</h2>
                <span>{homeInfo?.pagas || 0}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
