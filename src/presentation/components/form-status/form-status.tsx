import React, { useContext } from 'react';
import Spinner from '@/presentation/components/spinner/spinners';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner}/>}
      {state.mainError && <span data-testid='mainError' className={Styles.error}>{state.mainError}</span>}
    </div>
  );
};

export default FormStatus;
