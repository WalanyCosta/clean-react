import React, { useEffect, useState } from 'react';
import { Footer, FormStatus, Header, Input } from '@/presentation/components';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './signup-styles.scss';
import { Validation } from '@/presentation/protocols/validation';
type Props = {
  validation?: Validation;
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    emailError: '',
    email: '',
    passwordError: 'campo obrigatório',
    passwordConfirmationError: 'campo obrigatório',
    mainError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email)
    });
  }, [state.email]);

  return (
      <div className={Styles.signup}>
        <Header />
        <Context.Provider value={{ state, setState }}>
          <form className={Styles.form}>
            <h2>Criar conta</h2>
            <Input type="email" name="email" placeholder="Digite seu email" />
            <Input type="password" name="password" placeholder="Digite sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
            <button
              data-testid='submit'
              disabled
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
