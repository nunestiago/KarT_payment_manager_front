import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import cepMask from '../../utils/cepMask';
import cpfMask from '../../utils/cpfMask';
import './style.scss';
import useAuth from '../../hooks/useAuth';
import phoneMask from '../../utils/phoneMask';
import registerValidations from './validations';

function ClientRegister() {
  const [address, setAddress] = useState({});
  const { token } = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  const handleCep = async e => {
    const insertedCep = e.target.value.replace(/[^0-9]/g, '');

    if (insertedCep.length < 8) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${insertedCep}/json/`,
      );
      const viaCep = await response.json();
      setValue('logradouro', viaCep.logradouro);
      setValue('bairro', viaCep.bairro);
      setValue('cidade', viaCep.localidade);
      setValue('complemento', viaCep.complemento);
      setAddress(viaCep);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddClient = async data => {
    data.cpf = data.cpf.replace(/[^0-9]/g, '');
    data.telefone = data.telefone.replace(/[^0-9]/g, '');
    data.cep = data.cep.replace(/[^0-9]/g, '');

    if (data.cpf.length !== 11) {
      return toast.error('CPF deve conter 11 dígitos');
    }

    if (data.telefone.length !== 11 && data.telefone.length !== 10) {
      return toast.error('(DDD) e telefone com 8 ou 9 dígitos');
    }
    try {
      registerValidations(data);
      const response = await fetch(`${baseUrl}client/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const registerInDB = await response.json();

      if (!response.ok) {
        throw new Error(registerInDB);
      }
      history.push('/clientes');
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="client_register__container">
      <p className="drop_down_report">{'//'} ADICIONAR CLIENTE </p>
      <div className="client_register">
        <form
          noValidate
          autoComplete="off"
          className="form-client"
          onSubmit={handleSubmit(handleAddClient)}
        >
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            {...register('nome', { required: true })}
          />
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            onInvalid={() => toast.error('E-mail inválido')}
            {...register('email', { required: true })}
          />{' '}
          <div className="half">
            <div className="addClient">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                {...register('cpf', { required: true })}
                maxLength="14"
                onChange={cpfMask}
              />{' '}
            </div>
            <div className="addClient">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="text"
                {...register('telefone', { required: true })}
                maxLength="15"
                onChange={phoneMask}
              />{' '}
            </div>
          </div>
          <div className="half">
            <div className="addClient">
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                {...register('cep')}
                maxLength="10"
                onChange={e => {
                  handleCep(e);
                  cepMask(e);
                }}
              />
            </div>
            <div className="addClient">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                id="logradouro"
                type="text"
                {...register('logradouro')}
                value={address.logradouro}
                onChange={e => setAddress({ logradouro: e.target.value })}
              />
            </div>
          </div>
          <div className="half">
            <div className="addClient">
              <label htmlFor="bairro">Bairro</label>
              <input
                id="bairro"
                type="text"
                {...register('bairro')}
                value={address.bairro}
                onChange={e => setAddress({ bairro: e.target.value })}
              />{' '}
            </div>
            <div className="addClient">
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                {...register('cidade')}
                value={address.localidade}
                onChange={e => setAddress({ cidade: e.target.value })}
              />
            </div>
          </div>
          <div className="half">
            <div className="addClient">
              <label htmlFor="complemento">Complemento</label>
              <input
                id="complemento"
                type="text"
                {...register('complemento')}
                value={address.complemento}
                onChange={e => setAddress({ complemento: e.target.value })}
              />
            </div>
            <div className="addClient">
              <label htmlFor="pref">Ponto de Referência</label>
              <input id="pref" type="text" {...register('ponto_referencia')} />
            </div>
          </div>
          <div className="flex-row btn-add-client">
            <Link to="/clientes">
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
              Adicionar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientRegister;
