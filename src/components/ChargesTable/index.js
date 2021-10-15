import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import SortNameButton from '../../components/SortNameButton';
import ModalEditCharge from '../../components/ModalEditCharge';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

function ChargesTable({ children, fromReports }) {
  const { token } = useAuth();
  const [charges, setCharges] = useState([]);
  const [charge, setCharge] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);

  const handleGetCharges = async () => {
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
        toast.error(dados);
        return;
      }
      if (dados.length === 0) {
        return;
      }

      setFilteredCharges(dados);
      setCharges(dados);
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handleStatus(status, due) {
    if (status) {
      return 'PAGO';
    }
    if (new Date(due).getTime() < Date.now()) {
      return 'VENCIDO';
    }
    return 'PENDENTE';
  }

  function handleModal(selectedCharge) {
    setModalEdit(!modalEdit);
    setCharge(selectedCharge);
  }

  useEffect(() => {
    handleGetCharges();
  }, []);

  useEffect(() => {
    setFilteredCharges(fromReports);
  }, [fromReports]);
  return (
    <div>
      <div className="flex-row mb30 items-center between">
        <div>{children}</div>
        <SearchInput data={charges} setListState={setFilteredCharges} />
      </div>

      <table className="table">
        <thead>
          <tr className="table-head-charges">
            <th>ID</th>

            <th>
              <div className="flex-row">
                Cliente
                <SortNameButton
                  data={charges}
                  setListState={setFilteredCharges}
                />
              </div>
            </th>

            <th>Descrição</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Vencimento</th>
          </tr>
        </thead>
        {filteredCharges ? (
          filteredCharges.map(key => (
            <tbody key={key.id}>
              <tr className="charges-body">
                <td className="charges-list-id">#{key.id}</td>
                <td
                  className="charges-list-nome"
                  onClick={() => handleModal(key)}
                >
                  {key.nome}
                </td>
                <td className="charges-list-descricao">{key.descricao}</td>
                <td className="charges-list-valor">
                  R$ {(key.valor / 100).toFixed(2)}
                </td>
                <td
                  className={`charges-list-status ${handleStatus(
                    key.status,
                    key.vencimento,
                  ).toLowerCase()}`}
                >
                  {handleStatus(key.status, key.vencimento)}
                </td>
                <td className="charges-list-vencimento">
                  {new Date(key.vencimento).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td style={{ background: 'none' }}>
                <p>Nenhum Registro</p>
                <Link to={'/nova-cobranca'}>
                  Clique aqui para cadastrar nova cobrança
                </Link>
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {modalEdit && (
        <ModalEditCharge
          charge={charge}
          closeModal={setModalEdit}
          handleGetCharges={handleGetCharges}
        />
      )}
    </div>
  );
}

export default ChargesTable;
