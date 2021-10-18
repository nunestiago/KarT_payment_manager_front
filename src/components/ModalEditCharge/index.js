import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Link, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TextInputMask } from 'tp-react-web-masked-text';
import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';
import useAuth from '../../hooks/useAuth';
import baseUrl from '../../utils/baseUrl';
import trashIcon from '../../assets/trash.svg';

registerLocale('pt', pt);

function ModalEditCharge({ charge, closeModal, handleGetCharges }) {
  const { token } = useAuth();
  const { register, handleSubmit, control } = useForm({
    mode: 'onChange',
  });
  const [clients, setClients] = useState([]);
  const [payload, setPayload] = useState();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  async function handleGetClients() {
    try {
      const response = await fetch(`${baseUrl}client/listName`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    if (payload.valor < 0.01) {
      return toast.error('Valor deve ser maior que zero');
    }

    if (payload.status !== true && payload.status !== false) {
      return toast.error('Favor selecionar status da cobrança');
    }

    try {
      const response = await fetch(`${baseUrl}charges/editCharge`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const registerInDB = await response.json();
      if (!response.ok) {
        throw new Error(registerInDB);
      }
      closeModal(false);
      setOpenModal(false);
      handleGetCharges();
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    handleGetClients();
    setPayload(charge);
  }, []);

  async function handleDeleteCharge() {
    if (payload.status === true) {
      toast.error('Cobrança paga não pode ser excluída');
      return history.push('/cobrancas');
    }

    if (new Date(payload.vencimento).getTime() < Date.now()) {
      toast.error('Cobrança vencida não pode ser excluída');
      return history.push('/cobrancas');
    }

    try {
      const response = await fetch(`${baseUrl}charges/delete`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados);
      }
      handleGetCharges();
      toast.success('Cobrança foi excluída');
      history.push('/cobrancas');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="modal_container" onClick={() => closeModal(false)}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {' '}
          <div className="create-charge">
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(handleEditCharge)}
            >
              <div onClick={() => closeModal()} className="modal-close">
                X
              </div>
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
                  {clients &&
                    clients?.map(key => (
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
                <textarea
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
                  value="default2"
                  hidden
                >
                  Selecione o um status
                </option>
                <option
                  label="Pago"
                  value
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
                <div className="valor flex-column">
                  <label htmlFor="valor">Valor</label>
                  <Controller
                    control={control}
                    name="valor"
                    render={({ field }) => (
                      <TextInputMask
                        className="valor_container"
                        id="valor"
                        kind="money"
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
                <div className="flex-column vencimento">
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
              <div className=" flex-row items-center mb30">
                <div
                  className="delete flex-row items-center mr"
                  onClick={() => setOpenModal(!openModal)}
                >
                  <img src={trashIcon} alt="trash-icon" />
                  <p>Excluir cobrança</p>
                </div>

                {openModal && (
                  <div className="box2 sb11 flex-column content-center">
                    <div className="flex-column text-delete">
                      <p className="erase_item">Apagar item?</p>
                      <div className="flex-row  items-center buttons-y-n">
                        <button
                          onClick={() => {
                            handleDeleteCharge();
                            closeModal(false);
                            setOpenModal(false);
                          }}
                          className="blue"
                        >
                          Sim
                        </button>
                        <button className="red">
                          <Link
                            className="red"
                            to="/cobrancas"
                            onClick={() => closeModal(false)}
                          >
                            Não
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-row btn-create-charge">
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
