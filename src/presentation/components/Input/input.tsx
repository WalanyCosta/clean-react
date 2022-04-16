import React, { useContext } from 'react';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const getTitle = (): string => {
    return error || 'tudo certo';
  };

  const getStatus = (): string => {
    return error ? '🔴' : '🟢';
  };

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={props.name} {...props} onChange={handleChange}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
