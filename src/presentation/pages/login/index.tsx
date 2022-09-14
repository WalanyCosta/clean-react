import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Input, FormStatus, Header, SubmitButton } from '@/presentation/components';
import { Context, ApiContext } from '@/presentation/context';
import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const navegate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    emailError: '',
    email: '',
    passwordError: '',
    password: '',
    mainError: ''
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true, mainError: '' });
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      });
      setCurrentAccount(account);
      navegate('/', { replace: true });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      });
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu email" />
          <Input type="password" name="password" placeholder="Digite o sua senha" />
          <SubmitButton text='Entrar' />
          <Link to='/signup' data-testid='signup-link' className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
