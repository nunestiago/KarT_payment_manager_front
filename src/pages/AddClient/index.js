import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function AddClient() {
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState({});

  const handleCep = async (e) => {
    const insertedCep = e.target.value;

    const cep = insertedCep?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const viaCep = await response.json();

      setAddress(viaCep);
      console.log(address);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddClient = async (data) => {};

  return (
    <div>
      AddClient{' '}
      <div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleAddClient)}
        >
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" {...register('nome')} />
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" {...register('email')} />{' '}
          <div>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" type="text" {...register('cpf')} />{' '}
            <label htmlFor="telefone">Telefone</label>
            <input id="telefone" type="text" {...register('telefone')} />{' '}
            <label htmlFor="cep">CEP</label>
            <input
              id="cep"
              type="text"
              {...register('cep')}
              onBlur={(e) => handleCep(e)}
            />
            <label htmlFor="logradouro">Logradouro</label>
            <input
              id="logradouro"
              type="text"
              {...register('logradouro')}
              value={address.logradouro}
            />
            <label htmlFor="bairro">Bairro</label>
            <input
              id="bairro"
              type="text"
              {...register('bairro')}
              value={address.bairro}
            />{' '}
            <label htmlFor="cidade">Cidade</label>
            <input
              id="cidade"
              type="text"
              {...register('cidade')}
              value={address.localidade}
            />
            <label htmlFor="complemento">Complemento</label>
            <input
              id="complemento"
              type="text"
              {...register('complemento')}
              value={address.complemento}
            />
            <label htmlFor="pref">Ponto de Referência</label>
            <input id="pref" type="text" {...register('ponto_referencia')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
