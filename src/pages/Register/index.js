import React, { useState } from 'react';
import './style.scss';
import '../../styles/global.scss';
import '../../styles/alignments.scss';
import '../../styles/form.scss';
import '../../styles/buttons.scss';
import CubosAcademyLogo from '../../assets/cubos-academy.svg';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import registerValidations from './validations';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import PasswordInput from '../../components/PasswordInput';

function Register() {
  const { register, handleSubmit } = useForm();
  const [password, setPassword] = useState('');

  async function handleRegister(data) {
    console.log(data);
    registerValidations(data);
    try {
      const response = await fetch(`${baseUrl}user/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      const registerInDB = await response.json();

      if (!response.ok) {
        throw new Error(registerInDB);
      }
    } catch (error) {
      toast.error(error);
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
              {...register('nome')}
            />
          </div>
          <div className="flex-column input">
            <label>E-mail</label>            
            <input
              id="email"
              type="email"
              label="E-mail"
              placeholder="exemplo@gmail.com"
              {...register('email')}
            />
          </div>
          <PasswordInput
            label="Senha"
            placeholder="minhasenha"
            value={password}
            setValue={setPassword}
          />
        </div>
        <button
          type="submit"
          className="btn-pink-light flex-row items-center content-center"
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
