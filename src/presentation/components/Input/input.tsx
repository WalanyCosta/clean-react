import React, { useContext } from 'react';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context);

  const getTitle = (): string => {
    return errorState[`${props.name}`];
  };

  const getStatus = (): string => {
    return '🔴';
  };

  return (
    <div className={Styles.inputWrap}>
      <input {...props}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
