import React, { useEffect, useState } from 'react';
import { Footer, FormStatus, Header, Input, SubmitButton } from '@/presentation/components';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './signup-styles.scss';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount, SaveAccessToken } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  validation?: Validation;
  addAccount?: AddAccount;
  saveAccessToken?: SaveAccessToken;
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const navegate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    emailError: '',
    email: '',
    passwordError: '',
    password: '',
    passwordConfirmationError: '',
    passwordConfirmation: '',
    mainError: ''
  });

  useEffect(() => {
    const { email, password, passwordConfirmation } = state;
    const formData = { email, password, passwordConfirmation };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData);
    setState({
      ...state,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!emailError || !!passwordError || !!passwordConfirmationError
    });
  }, [
    state.email,
    state.password,
    state.passwordConfirmation
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true, mainError: '' });
      const account = await addAccount.add({
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
      <div className={Styles.signupWrap}>
        <Header />
        <Context.Provider value={{ state, setState }}>
          <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
            <h2>Criar conta</h2>
            <Input type="email" name="email" placeholder="Digite seu email" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
            <SubmitButton text='Cadastrar' />
            <Link to='/login' data-testid='login-link' className={Styles.link}>
              Voltar para Login
            </Link>
            <FormStatus />
          </form>
        </Context.Provider>
        <Footer />
      </div>
  );
};

export default SignUp;
