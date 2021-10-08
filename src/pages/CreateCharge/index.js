import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style.scss';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { TextInputMask } from 'tp-react-web-masked-text';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

function CreateCharge() {
  const history = useHistory();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const [clients, setClients] = useState([]);
  const [money, setMoney] = useState();
  const [startDate, setStartDate] = useState(new Date());

  async function handleGetClients() {
    try {
      const response = await fetch(`${baseUrl}client/listName`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados);
      }

      setClients(dados);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleAddCharge(data) {
    console.log(data);

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
      toast.success(registerInDB);
      history.push('/cobrancas');
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleSetValue(e) {
    setMoney(e);
    setValue('valor', e.replace(/[^0-9]/g, ''));
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
            defaultValue="default"
          >
            <option label="Selecione o cliente" disabled value="default" hidden>
              Selecione o cliente
            </option>
            {clients.map(key => (
              <option key={key.id} value={key.id}>
                {key.nome}
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
            defaultValue="default2"
          >
            <option
              label="Selecione o um status"
              disabled
              value="default2"
              hidden
            >
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
              <TextInputMask
                className="valor_container"
                id="valor"
                {...register('valor')}
                kind={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$ ',
                  suffixUnit: '',
                }}
                value={money}
                onChange={e => handleSetValue(e)}
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
          <DatePicker
            className="vencimento_container"
            locale="pt"
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="dd 'de' MMMM 'de' yyyy"
          />
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
