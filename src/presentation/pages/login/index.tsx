import React from 'react';
import Header from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import Input from '@/presentation/components/Input/input';
import FormStatus from '@/presentation/components/form-status/form-status';

import '../../styles/global-styles.scss';
import Styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu email" />
          <Input type="password" name="password" placeholder="Digite o sua senha" />
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
