import React, { memo } from 'react';
import Spinner from '@/presentation/components/spinner/spinners';

import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner}/>
      <span className={Styles.error}>Erro ao logar</span>
    </div>
  );
};

export default FormStatus;
