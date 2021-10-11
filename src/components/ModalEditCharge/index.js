import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import baseUrl from '../../utils/baseUrl';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TextInputMask } from 'tp-react-web-masked-text';
import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';
registerLocale('pt', pt);

function ModalEditCharge({ charge, closeModal, handleGetCharges }) {
  // const history = useHistory();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const [clients, setClients] = useState([]);
  const [startDate] = useState(new Date());
  const [payload, setPayload] = useState();

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

  async function handleEditCharge() {
    if (typeof payload.valor === 'string') {
      payload.valor = payload.valor.replace(/[^0-9]/g, '');
    }
    if (payload.valor < 0.01)
      return toast.error('Valor deve ser maior que zero');

    if (payload.status !== true && payload.status !== false) {
      return toast.error('Favor selecionar status da cobrança');
    }
    console.log(payload);
    try {
      const response = await fetch(`${baseUrl}charges/editCharge`, {
        method: 'PUT',
        body: JSON.stringify(payload),
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
      closeModal(false);
      handleGetCharges();
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    handleGetClients();
    setPayload(charge);
  }, []);

  return (
    <>
      <div className="modal_container" onClick={() => closeModal(false)}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {' '}
          <div className="client_register">
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(handleEditCharge)}
            >
              <div className="flex-column">
                <label htmlFor="cliente">Cliente</label>
                <select
                  className="select"
                  id="cliente"
                  {...register('cliente_id')}
                  defaultValue="default"
                >
                  <option label={payload?.nome} disabled value="default" hidden>
                    Selecione o cliente
                  </option>
                  {clients.map(key => (
                    <option
                      key={key.id}
                      value={key.id}
                      onClick={() =>
                        setPayload({ ...payload, cliente_id: key.id })
                      }
                    >
                      {key.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-help">
                <label htmlFor="descricao">Descrição</label>
                <input
                  id="descricao"
                  type="descricao"
                  className="descricao"
                  {...register('descricao')}
                  value={payload?.descricao}
                  onChange={e =>
                    setPayload({ ...payload, descricao: e.target.value })
                  }
                />

                <span className="input-help-text">
                  A descrição informada será impressa no boleto.
                </span>
              </div>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="select"
                {...register('status')}
                defaultValue={payload?.status}
              >
                <option
                  label="Selecione o um status"
                  disabled
                  value={'default2'}
                  hidden
                >
                  Selecione o um status
                </option>
                <option
                  label="Pago"
                  value={true}
                  onClick={() => setPayload({ ...payload, status: true })}
                >
                  Pago
                </option>
                <option
                  label="Pendente"
                  value={false}
                  onClick={() => setPayload({ ...payload, status: false })}
                >
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
                        value={payload?.valor}
                        onChange={date => {
                          setPayload({ ...payload, valor: date });
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
                    render={({ field }) => (
                      <DatePicker
                        placeholderText={new Date(
                          payload?.vencimento,
                        ).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                        locale="pt"
                        dateFormat="dd 'de' MMMM 'de' yyyy"
                        onChange={date => {
                          field.onChange(date);
                          setPayload({ ...payload, vencimento: date });
                        }}
                        selected={field.value}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex-row btn-add-client">
                <Link to="/cobrancas" onClick={() => closeModal(false)}>
                  <button
                    type="submit"
                    className="btn-pink-border flex-row items-center content-center"
                  >
                    Cancelar
                  </button>
                </Link>
                <button type="submit" className="btn-pink-light">
                  Editar Cobrança
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEditCharge;
