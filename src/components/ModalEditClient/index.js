import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import cepMask from '../../utils/cepMask';
import cpfMask from '../../utils/cpfMask';
import phoneMask from '../../utils/phoneMask';
import useAuth from '../../hooks/useAuth';
import './style.scss';

function ModalEditClient({ closeModal, client, setClient }) {
  const [address, setAddress] = useState({});
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });
  const { token } = useAuth();

  const handleCep = async e => {
    const insertedCep = e.target.value;

    console.log(insertedCep);
    if (insertedCep?.length < 9) {
      return;
    }
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${insertedCep?.replace(/[^0-9]/g, '')}/json/`,
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

  const handleEditClient = async data => {
    const onlyUpdatedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value),
    );

    if (data.cpf) data.cpf = data.cpf.replace(/[^0-9]/g, '');
    if (data.telefone) data.telefone = data.telefone.replace(/[^0-9]/g, '');

    try {
      const response = await fetch(`${baseUrl}client/edit`, {
        method: 'PUT',
        body: JSON.stringify(onlyUpdatedData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const registerInDB = await response.json();

      if (!response.ok) {
        throw new Error(registerInDB);
      }
      setClient(onlyUpdatedData);
      closeModal();
      toast.success(registerInDB);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="modal_container" onClick={() => closeModal()}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <form
            noValidate
            autoComplete="off"
            className="form-edit-user modal_padding"
            onSubmit={handleSubmit(handleEditClient)}
          >
            <div onClick={() => closeModal()} className="modal_close">
              X
            </div>
            <div className="flex-column all-size">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                {...register('nome', { required: true })}
                defaultValue={client?.nome}
              />
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                defaultValue={client?.email}
              />{' '}
            </div>
            <div className="half">
              <div>
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  {...register('cpf', { required: true })}
                  maxLength="14"
                  onChange={cpfMask}
                  defaultValue={client?.cpf}
                />{' '}
              </div>
              <div>
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  type="text"
                  {...register('telefone', { required: true })}
                  maxLength="15"
                  onChange={phoneMask}
                  defaultValue={client?.telefone}
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
                  maxLength="9"
                  onChange={e => {
                    handleCep(e);
                    cepMask(e);
                  }}
                  defaultValue={client?.cep}
                />
              </div>
              <div>
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  id="logradouro"
                  type="text"
                  {...register('logradouro')}
                  value={address.logradouro}
                  onChange={e => setAddress({ logradouro: e.target.value })}
                  defaultValue={client?.logradouro}
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
                  onChange={e => setAddress({ bairro: e.target.value })}
                  defaultValue={client?.bairro}
                />{' '}
              </div>
              <div>
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
              <div>
                <label htmlFor="complemento">Complemento</label>
                <input
                  id="complemento"
                  type="text"
                  {...register('complemento')}
                  value={address.complemento}
                  onChange={e => setAddress({ complemento: e.target.value })}
                  defaultValue={client?.complemento}
                />
              </div>
              <div>
                <label htmlFor="pref">Ponto de Referência</label>
                <input
                  id="pref"
                  type="text"
                  {...register('ponto_referencia')}
                  defaultValue={client?.ponto_referencia}
                />
              </div>
            </div>
            <div className="flex-row btn-add-client">
              <button
                onClick={() => closeModal()}
                type="submit"
                className="btn-pink-border flex-row items-center content-center"
              >
                Cancelar
              </button>

              <button type="submit" className="btn-pink-light">
                Editar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEditClient;
