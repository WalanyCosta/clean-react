import React from 'react';
import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
};

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? Styles.negative : '';
  return (
    <div data-testid='spinner-status' {...props} className={[Styles.spinner, negativeClass, props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
