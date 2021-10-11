import React, { useEffect, useState } from 'react';
import './style.scss';
import '../../styles/global.scss';
import '../../styles/alignments.scss';
import '../../styles/form.scss';
import '../../styles/buttons.scss';
import CubosAcademyLogo from '../../assets/cubos-academy.svg';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import baseUrl from '../../utils/baseUrl';
import PasswordInput from '../../components/PasswordInput';
import useAuth from '../../hooks/useAuth';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000000',
  },
}));

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  const classes = useStyles();
  const history = useHistory();
  const { login, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      history.push('/home');
    }
  }, []);

  const handleLogin = async data => {
    if (!data.email || !data.senha) {
      toast.error('Email e senha são obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}user/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      setIsLoading(false);

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados);
      }

      login(dados);

      history.push('/home');
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    errors?.email && toast.error(errors.email.message);
  }, [errors?.email]);

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
              {...register('email', {
                required: 'E-mail e senha são obrigatórios',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido',
                },
              })}
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
          className={`btn-pink-light flex-row items-center content-center`}
          disabled={!isDirty || !isValid}
          type="submit"
        >
          ENTRAR
        </button>{' '}
      </form>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </h1>
    </div>
  );
}

export default Login;
