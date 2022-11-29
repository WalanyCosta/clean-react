import React, { useContext } from 'react';
import { SurveyContext } from '@/presentation/pages/survey-list/components';
import Styles from './error-styles.scss';

type Props ={
  error: string,
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  );
};

export default Error;
