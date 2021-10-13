import React from 'react';
import './style.scss';
import '../../styles/global.scss';
import '../../styles/alignments.scss';
import '../../styles/form.scss';
import '../../styles/buttons.scss';
import CubosAcademyLogo from '../../assets/cubos-academy.svg';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import registerValidations from './validations';

import baseUrl from '../../utils/baseUrl';
import PasswordInput from '../../components/PasswordInput';

function Register() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });

  async function handleRegister(data) {
    try {
      registerValidations(data);
      const response = await fetch(`${baseUrl}user/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      const registerInDB = await response.json();
      if (!response.ok) {
        throw new Error(registerInDB);
      }
      toast.success('Registrado, favor fazer login');
      history.push('/');
    } catch (error) {
      return toast.error(error.message);
    }
  }
  return (
    <div className="container-form">
      <form
        className="form form-register"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleRegister)}
      >
        <img src={CubosAcademyLogo} alt="logo" />
        <div className="flex-column register">
          <div className="flex-column input">
            <label>Nome</label>
            <input
              id="user"
              type="text"
              placeholder="Novo Usuário"
              {...register('nome', { required: true })}
            />
          </div>
          <div className="flex-column input">
            <label>E-mail</label>
            <input
              id="email"
              type="email"
              label="E-mail"
              placeholder="exemplo@gmail.com"
              {...register('email', { required: true })}
            />
          </div>
          <PasswordInput
            label="Senha"
            placeholder="minhasenha"
            register={register}
            reqBool={true}
          />
        </div>
        <button
          type="submit"
          className="btn-pink-light flex-row items-center content-center"
          disabled={!isDirty || !isValid}
        >
          ENTRAR
        </button>
      </form>
      <h1>
        Já possui uma conta? <Link to="/">Acesse agora!</Link>
      </h1>
    </div>
  );
}

export default Register;
