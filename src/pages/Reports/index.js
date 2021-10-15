import './style.scss';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import baseUrl from '../../utils/baseUrl';
const ClientsTable = lazy(() => import('../../components/ClientsTable'));
const ChargesTable = lazy(() => import('../../components/ChargesTable'));
import ReportsDropDown from '../../components/ReportsDropDown';

function Reports() {
  const data = useLocation();
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [which, setWhich] = useState({ charges: false, clients: false });
  // const [query, setQuery] = useState(data.state.relatorio);

  const toQuery = new URLSearchParams(useLocation().search);
  let query = toQuery.get('relatorio') ?? data.state.relatorio;
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
    const myCharges = charges.filter(
      charge =>
        charge.status === false &&
        new Date(charge.vencimento).getTime() > Date.now(),
    );
    setFilteredCharges(myCharges);
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

  return (
    <div className="reports-box">
      {which.clients && (
        <Suspense fallback={<div>Loading...</div>}>
          <ClientsTable fromReports={filteredClients}>
            <ReportsDropDown />
          </ClientsTable>
        </Suspense>
      )}
      {which.charges && filteredCharges && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChargesTable fromReports={filteredCharges}>
            <ReportsDropDown />
          </ChargesTable>
        </Suspense>
      )}
    </div>
  );
}

export default Reports;
