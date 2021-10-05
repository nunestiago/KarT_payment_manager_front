import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import cepMask from '../../utils/cepMask';
import cpfMask from '../../utils/cpfMask';
import './style.scss';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router';
import phoneMask from '../../utils/phoneMask';

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
    const insertedCep = e.target.value;

    const cep = insertedCep?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      setValue('cep', cep);
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

    try {
      const response = await fetch(`${baseUrl}client/register`, {
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
      history.push('/');
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="client_register__container">
      {'//'} ADICIONAR CLIENTE{' '}
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
            {...register('email', { required: true })}
          />{' '}
          <div className="half">
            <div>
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                {...register('cpf', { required: true })}
                onChange={cpfMask}
              />{' '}
            </div>
            <div>
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="text"
                {...register('telefone', { required: true })}
                onChange={phoneMask}
              />{' '}
            </div>
          </div>
          <div className="half">
            <div>
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                {...register('cep')}
                onBlur={e => handleCep(e)}
                onChange={cepMask}
              />
            </div>
            <div>
              <label htmlFor="logradouro">Logradouro</label>
              <input
                id="logradouro"
                type="text"
                {...register('logradouro')}
                value={address.logradouro}
              />
            </div>
          </div>
          <div className="half">
            <div>
              <label htmlFor="bairro">Bairro</label>
              <input
                id="bairro"
                type="text"
                {...register('bairro')}
                value={address.bairro}
              />{' '}
            </div>
            <div>
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                {...register('cidade')}
                value={address.localidade}
              />
            </div>
          </div>
          <div className="half">
            <div>
              <label htmlFor="complemento">Complemento</label>
              <input
                id="complemento"
                type="text"
                {...register('complemento')}
                value={address.complemento}
              />
            </div>
            <div>
              <label htmlFor="pref">Ponto de Referência</label>
              <input id="pref" type="text" {...register('ponto_referencia')} />
            </div>
          </div>
          <div className="flex-row btn-add-client">
            <button
              type="submit"
              className="btn-pink-border flex-row items-center content-center"
            >
              Cancelar
            </button>
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
