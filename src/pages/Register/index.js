import React from 'react';
import './style.css';
import '../../styles/global.css';
import '../../styles/alignments.css';
import '../../styles/form.css';
import '../../styles/buttons.css';
import CubosAcademyLogo from '../../assets/cubos-academy.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="container-form">
        <form className="form form-register">
          <img src={CubosAcademyLogo} alt="logo" />
          <div className="flex-column input">
            <label>Nome</label>
            <input id="user" type="text" placeholder="Novo Usuário" />
            <label>E-mail</label>
            <input id="email" type="email" label="E-mail" placeholder="exemplo@gmail.com" />
            <label>Senha</label>
            <input id="password" type="password" label="Senha" placeholder="minhasenha" />
          </div>
            <button className="btn-pink-light flex-row items-center content-center">ENTRAR 
            </button>
        </form>
        <h1>Já possui uma conta? <Link to="/">Acesse agora!</Link></h1>
      </div>
  );
}

export default Register;