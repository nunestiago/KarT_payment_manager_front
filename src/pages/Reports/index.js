import './style.scss';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import baseUrl from '../../utils/baseUrl';
import ClientsTable from '../../components/ClientsTable';
import ChargesTable from '../../components/ChargesTable';
import ReportsDropDown from '../../components/ReportsDropDown';

function Reports() {
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  const [which, setWhich] = useState({ charges: false, clients: false });

  const data = useLocation();
  const toQuery = new URLSearchParams(useLocation().search);
  const query = toQuery.get('relatorio') ?? data.state.relatorio;

  async function handleGetClients() {
    try {
      const response = await fetch(`${baseUrl}client/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const dados = await response.json();

      setClients(dados);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleGetCharges() {
    try {
      const response = await fetch(`${baseUrl}charges/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await response.json();

      if (!response.ok) {
        return;
      }

      setCharges(dados);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function getQuery() {
    switch (query) {
      case 'emdia':
        handleEmDia();
        break;
      case 'inadimplente':
        handleInadimplente();
        break;
      case 'previstas':
        handlePrevistas();
        break;
      case 'pagas':
        handlePagas();
        break;
      case 'vencidas':
        handleVencidas();
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    handleGetClients();
    handleGetCharges();
  }, []);

  useEffect(() => {
    getQuery();
  }, [query, clients, charges]);

  function handleEmDia() {
    setWhich({ charges: false, clients: true });
    const result = clients.filter(
      client => (client.feitas || 0) - (client.recebidas || 0) === 0,
    );
    return setFilteredClients(result);
  }

  function handleInadimplente() {
    setWhich({ charges: false, clients: true });
    return setFilteredClients(
      clients.filter(
        client => (client.feitas || 0) - (client.recebidas || 0) !== 0,
      ),
    );
  }

  function handlePrevistas() {
    setWhich({ charges: true, clients: false });
    return setFilteredCharges(
      charges.filter(
        charge =>
          charge.status === false &&
          new Date(charge.vencimento).getTime() > Date.now(),
      ),
    );
  }

  function handlePagas() {
    setWhich({ charges: true, clients: false });
    return setFilteredCharges(charges.filter(charge => charge.status === true));
  }

  function handleVencidas() {
    setWhich({ charges: true, clients: false });
    return setFilteredCharges(
      charges.filter(
        charge =>
          new Date(charge.vencimento).getTime() < Date.now() &&
          charge.status === false,
      ),
    );
  }

  // function handleModal() {
  //   setDropMenuOne(!dropMenuOne);
  //   setOpenModal(!openModal);
  // }

  return (
    <div className="reports-box">
      {which.clients && (
        <ClientsTable fromReports={filteredClients}>
          <ReportsDropDown />
        </ClientsTable>
      )}
      {which.charges && (
        <ChargesTable fromReports={filteredCharges}>
          <ReportsDropDown query={query} />
        </ChargesTable>
      )}
    </div>
  );
}

export default Reports;
