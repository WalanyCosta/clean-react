import React, { useState } from 'react';
import { Footer, Input, FormStatus, Header } from '@/presentation/components';
import { Context } from '@/presentation/context/form/form-context';

import Styles from './login-styles.scss';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  });

  const [errorState] = useState({
    email: 'campo obrigatório',
    password: 'campo obrigatório',
    mainError: ''
  });

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu email" />
          <Input type="password" name="password" placeholder="Digite o sua senha" />
          <button data-testid='submit' disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
