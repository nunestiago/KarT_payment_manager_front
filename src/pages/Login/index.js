import React, { useState } from 'react';
import './style.scss';
import '../../styles/global.scss';
import '../../styles/alignments.scss';
import '../../styles/form.scss';
import '../../styles/buttons.scss';
import CubosAcademyLogo from '../../assets/cubos-academy.svg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PasswordInput from '../../components/PasswordInput';

function Login() {
  const { register, handleSubmit } = useForm();
  const [password, setPassword] = useState('');

  const handleLogin = async (data) => {
    if (!data.email || !data.senha) {
      toast.error('Email e senha são obrigatórios.');
      return;
    }
    try {
      const response = await fetch(
        'https://kartmanagement.herokuapp.com/user/login',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) {
        toast.error('Email ou senha incorretos.');
        return;
      }
      const dados = await response.json();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container-form">
      <form
        className="form form-login items-center content-center"
        onSubmit={handleSubmit(handleLogin)}
      >
        <img src={CubosAcademyLogo} alt="logo" />
        <div className="flex-column">
          <div className="flex-column input">
            <label>E-mail</label>
            <input
              id="email"
              type="email"
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
        <button className="btn-pink-light flex-row items-center content-center">
          ENTRAR
        </button>
      </form>
      <h1>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </h1>
    </div>
  );
}

export default Login;
