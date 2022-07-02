import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Input, FormStatus, Header } from '@/presentation/components';
import { Context } from '@/presentation/context/form/form-context';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken?: SaveAccessToken;
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const navegate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    emailError: '',
    email: '',
    passwordError: '',
    password: '',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    });
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      if (state.isLoading || state.passwordError || state.emailError) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      });
      await saveAccessToken.save(account.accessTokes);
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
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu email" />
          <Input type="password" name="password" placeholder="Digite o sua senha" />
          <button
            data-testid='submit'
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <Link to='/signUp' data-testid='register' className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
