import React from 'react';
import './style.css';
import '../../styles/global.css';
import '../../styles/alignments.css';
import '../../styles/form.css';
import '../../styles/buttons.css';
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
            <input id="password" type="password" label="Senha" placeholder="minhasenha" />
          </div>
            <button className="btn-pink-light flex-row items-center content-center">ENTRAR 
            </button>
        </form>
        <h1>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></h1>
    </div>
  );
}

export default Login;
