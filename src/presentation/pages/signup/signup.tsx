import React, { useEffect, useState } from 'react';
import { Footer, FormStatus, Header, Input } from '@/presentation/components';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './signup-styles.scss';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/usecases';

type Props = {
  validation?: Validation;
  addAccount?: AddAccount;
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: '',
    email: '',
    passwordError: '',
    password: '',
    passwordConfirmationError: '',
    passwordConfirmation: '',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    });
  }, [
    state.email,
    state.password,
    state.passwordConfirmation
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (state.isLoading ||
        state.passwordError ||
        state.emailError ||
        state.passwordConfirmationError) {
      return;
    }
    setState({ ...state, isLoading: true });
    await addAccount.add({
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    });
  };

  return (
      <div className={Styles.signup}>
        <Header />
        <Context.Provider value={{ state, setState }}>
          <form className={Styles.form} onSubmit={handleSubmit}>
            <h2>Criar conta</h2>
            <Input type="email" name="email" placeholder="Digite seu email" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
            <button
              data-testid='submit'
              disabled={
                !!state.emailError ||
                !!state.passwordError ||
                !!state.passwordConfirmation
              }
              className={Styles.submit}
              type="submit"
            >
              Entrar
            </button>
            <span className={Styles.link}>Criar conta</span>
            <FormStatus />
          </form>
        </Context.Provider>
        <Footer />
      </div>
  );
};

export default SignUp;
