import React, { useEffect, useState } from 'react';
import './style.scss';
import clientsIcon from '../../assets/clients.svg';
import moneyIcon from '../../assets/money.svg';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';

function Home() {
  const { token, setClients } = useAuth();
  const [clientDebt, setClientDebt] = useState();

  const handleClients = async () => {
    try {
      const response = await fetch(`${baseUrl}client/getAll`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const clients = await response.json();
      setClients(clients);

      const counts = clients.reduce(
        (c, { em_dia: key }) => ((c[key] = (c[key] || 0) + 1), c),
        {},
      );
      setClientDebt(counts);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleClients();
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
