import './style.scss';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import baseUrl from '../../utils/baseUrl';
import { toast } from 'react-toastify';
import SortNameButton from '../../components/SortNameButton';
import showPhone from '../../utils/showProperPhone';
import mailIcon from '../../assets/mail.svg';
import phonelIcon from '../../assets/phone.svg';
import { Link, useLocation } from 'react-router-dom';
function Reports() {
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [which, setWhich] = useState({ charges: false, clients: false });
  let data = useLocation();
  const toQuery = new URLSearchParams(useLocation().search);
  let query = toQuery.get('relatorio') ?? data.state.relatorio;
  console.log(query);

  async function handleGetClients() {
    try {
      const response = await fetch(`${baseUrl}client/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
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
          Authorization: 'Bearer ' + token,
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
    setFilteredClients(
      clients.filter(
        client => (client.feitas || 0) - (client.recebidas || 0) === 0,
      ),
    );
  }

  function handleInadimplente() {
    setWhich({ charges: false, clients: true });
    setFilteredClients(
      clients.filter(
        client => (client.feitas || 0) - (client.recebidas || 0) !== 0,
      ),
    );
  }

  function handlePrevistas() {
    setWhich({ charges: true, clients: false });
    setFilteredCharges(
      charges.filter(
        charge =>
          charge.status === false &&
          new Date(charge.vencimento).getTime() > Date.now(),
      ),
    );
  }

  function handlePagas() {
    setWhich({ charges: true, clients: false });
    setFilteredCharges(charges.filter(charge => charge.status === true));
  }

  function handleVencidas() {
    setWhich({ charges: true, clients: false });
    setFilteredCharges(
      charges.filter(
        charge => new Date(charge.vencimento).getTime() < Date.now(),
      ),
    );
  }

  function handleStatus(status, due) {
    if (status) {
      return 'PAGO';
    }
    if (new Date(due).getTime() < Date.now()) {
      return 'VENCIDO';
    }
    return 'PENDENTE';
  }

  return (
    <div className="flex-column">
      <div className="flex-row report-head">
        <Link to="/relatorios?relatorio=emdia">
          <button className="btn-pink-report">Em dia</button>
        </Link>

        <Link to="/relatorios?relatorio=inadimplente">
          <button className="btn-pink-report">Inadimplente</button>
        </Link>
        <Link to="/relatorios?relatorio=previstas">
          <button className="btn-pink-report">Previstas</button>
        </Link>
        <Link to="/relatorios?relatorio=pagas">
          <button className="btn-pink-report">Pagas</button>
        </Link>
        <Link to="/relatorios?relatorio=vencidas">
          <button className="btn-pink-report">Vencidas</button>
        </Link>
      </div>
      {which.clients && (
        <>
          <div className="table-head flex-row items-center">
            <div className="flex-row items-center">
              <h1>Cliente</h1>
              <SortNameButton
                data={clients}
                setListState={setFilteredClients}
              />
            </div>
            <div className="th-middle flex-row items-center">
              <h1>Cobranças Feitas</h1>
              <h1>Cobranças Recebidas</h1>
              <h1>Status</h1>
            </div>
            <div className="empty-space"></div>
          </div>
          <div className="table-body flex-column">
            {filteredClients?.map(client => (
              <div className="id-client flex-row" key={client.id}>
                <div className="client-column flex-column">
                  <p>{client.nome}</p>
                  <div className="flex-row mail">
                    <img src={mailIcon} alt="mail-icon" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex-row">
                    <img src={phonelIcon} alt="phone-icon" />
                    <span>{showPhone(client.telefone)}</span>
                  </div>
                </div>
                <div className="flex-row cob-feitas">
                  <span>
                    R$ {client.feitas ? (client.feitas / 100).toFixed(2) : 0}
                  </span>
                </div>
                <div className="flex-row cob-recebidas">
                  <span>
                    R${' '}
                    {client.recebidas ? (client.recebidas / 100).toFixed(2) : 0}
                  </span>
                </div>
                <div className="flex-row status">
                  <span>
                    {(client.feitas || 0) - (client.recebidas || 0) === 0 ? (
                      <span className="emdia">EM DIA</span>
                    ) : (
                      <span className="inadimplente">INADIMPLENTE</span>
                    )}
                  </span>
                </div>
                <div className="flex-row edit"></div>
              </div>
            ))}
          </div>
        </>
      )}
      {which.charges && (
        <>
          <div className="flex-column ">
            <div className="mb"></div>
            <div className="table-head-charges flex-row items-center">
              <h1>ID</h1>
              <div className="flex-row items-center">
                <h1>Cliente</h1>
                <SortNameButton
                  data={charges}
                  setListState={setFilteredCharges}
                />
              </div>
              <h1>Descrição</h1>
              <h1>Valor</h1>
              <h1>Status</h1>
              <h1>Vencimento</h1>
            </div>
          </div>
          <div>
            {filteredCharges?.map(key => (
              <div key={key.id} className="charges-body flex-row items-center">
                <div className="charges-list-id">#{key.id}</div>
                <div className="charges-list-nome">{key.nome}</div>
                <div className="charges-list-descricao">{key.descricao}</div>
                <div className="charges-list-valor">
                  R$ {(key.valor / 100).toFixed(2)}
                </div>
                <div
                  className={`charges-list-status ${handleStatus(
                    key.status,
                    key.vencimento,
                  ).toLowerCase()}`}
                >
                  {handleStatus(key.status, key.vencimento)}
                </div>
                <div className="charges-list-vencimento">
                  {new Date(key.vencimento).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
