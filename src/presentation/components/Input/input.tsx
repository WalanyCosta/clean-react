import React, { useContext, useRef } from 'react';
import { Context } from '@/presentation/context/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];
  const inputRef = useRef<HTMLInputElement>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
      />
      <label onClick={() => { inputRef.current.focus(); }}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'tudo certo'}
        className={Styles.status}>
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
};

export default Input;
