import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TextInputMask } from 'tp-react-web-masked-text';
import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';

registerLocale('pt', pt);

function CreateCharge() {
  const history = useHistory();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const [clients, setClients] = useState([]);
  const [valor, setValor] = useState(0);
  const [startDate] = useState(new Date());

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
    setValue('vencimento', startDate);
    if (valor === 0 || valor.replace(/[^0-9]/g, '') < 0.01)
      return toast.error('Valor deve ser maior que zero');
    if (data.status !== 'true' && data.status !== 'false') {
      return toast.error('Favor selecionar status da cobrança');
    }
    data.valor = valor.replace(/[^0-9]/g, '');

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

  useEffect(() => {
    handleGetClients();
  }, []);

  useEffect(() => {
    errors?.descricao && toast.error('A cobrança deve ter uma descrição');
  }, [errors.descricao]);

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
              {...register('descricao', {
                required: {
                  value: true,
                  message: 'A cobrança deve ter uma descrição',
                },
              })}
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
              value={'default2'}
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
              <Controller
                control={control}
                name="valor"
                render={({ field }) => (
                  <TextInputMask
                    className="valor_container"
                    id="valor"
                    kind={'money'}
                    options={{
                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$ ',
                      suffixUnit: '',
                    }}
                    value={valor}
                    onChange={date => {
                      setValor(date);
                      field.onChange(date);
                    }}
                    selected={field.value}
                  />
                )}
              />
            </div>
            <div className="flex-column ">
              <label htmlFor="vencimento">Vencimento</label>
              <Controller
                control={control}
                name="vencimento"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Selecione data"
                    locale="pt"
                    dateFormat="dd 'de' MMMM 'de' yyyy"
                    onChange={date => field.onChange(date)}
                    selected={field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex-row btn-add-client">
            <Link to="/cobrancas">
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
