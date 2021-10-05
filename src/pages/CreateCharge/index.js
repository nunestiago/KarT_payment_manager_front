import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style.scss';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import moneyMask from '../../utils/moneyValueMask';

function CreateCharge() {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const [clients, setClients] = useState({});

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
        toast.error('Email ou senha incorretos.');
        return;
      }

      const dados = await response.json();
      setClients(dados);
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleAddCharge(data) {
    try {
      const response = await fetch(`${baseUrl}charges/newCharge`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const registerInDB = await response.json();
      if (!response.ok) {
        throw new Error(registerInDB);
      }
      // history.push('/cobrancas');
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    handleGetClients();
  }, []);

  return (
    <div className="client_register__container">
      {'//'} CRIAR COBRANÇA{' '}
      <div className="client_register">
        <form
          noValidate
          autoComplete="off"
          className="form-client"
          onSubmit={handleSubmit(handleAddCharge)}
        >
          <label htmlFor="cliente">Cliente</label>
          <select
            className="select"
            id="cliente"
            {...register('cliente_id', { required: true })}
          >
            <option label="Selecione o cliente" disabled selected>
              Selecione o cliente
            </option>
            ;
            {Object.entries(clients).map(([key]) => (
              <option key={clients[key].id} value={clients[key].id}>
                {clients[key].nome}
              </option>
            ))}
          </select>

          <div className="input-help">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              type="descricao"
              className="descricao"
              {...register('descricao', { required: true })}
            />
            <span className="input-help-text">
              A descrição informada será impressa no boleto.
            </span>
          </div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="select"
            {...register('status', { required: true })}
            maxLength="14"
          >
            <option label="Selecione o um status" disabled selected>
              Selecione o um status
            </option>
            <option label="Pago" value={true}>
              Pago
            </option>
            <option label="Pendente" value={false}>
              Pendente
            </option>
          </select>
          <div className="half">
            <div className="valor">
              <label htmlFor="valor">Valor</label>
              <input
                className="valor_container"
                id="valor"
                type="text"
                onChange={moneyMask}
                //TODO forçar input a só aceitar número
                {...register('valor')}
              />
            </div>
            <div>
              <label htmlFor="vencimento">Vencimento</label>
              <input
                id="vencimento"
                type="date"
                className="vencimento_container"
                {...register('vencimento')}
              />
            </div>
          </div>
          <div className="flex-row btn-add-client">
            <Link to="/home">
              <button
                type="submit"
                className="btn-pink-border flex-row items-center content-center"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="btn-pink-light"
              disabled={!isValid || !isDirty}
            >
              Criar Cobrança
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCharge;
