import React from 'react';
import './style.scss';
import '../../styles/global.scss';
import '../../styles/alignments.scss';
import '../../styles/form.scss';
import '../../styles/buttons.scss';
import CubosAcademyLogo from '../../assets/cubos-academy.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container-form">
      <form className="form form-login items-center content-center">
        <img src={CubosAcademyLogo} alt="logo" />
        <div className="flex-column input">
          <label>E-mail</label>
          <input id="email" type="email" placeholder="exemplo@gmail.com" />
          <label>Senha</label>
          <input
            id="password"
            type="password"
            label="Senha"
            placeholder="minhasenha"
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
