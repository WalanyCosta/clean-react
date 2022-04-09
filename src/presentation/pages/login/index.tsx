import React from 'react';
import Spinner from '@/presentation/components/spinner/spinners';
import Header from '@/presentation/components/login-header/login-header';
import '../../styles/global-styles.scss';
import Styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite o seu email" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite o sua senha" />
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Erro ao logar</span>
        </div>
      </form>
      <footer className={Styles.footer} />
    </div>
  );
};

export default Login;
