import React from 'react';
import Styles from './calendar-styles.scss';

type Props = {
  date: Date,
  className?: string
}

const formatMonthToPTBR = (date: Date): string => {
  const month = new Intl.DateTimeFormat('pt-br', { month: 'short' });
  return month.format(date).replace('.', '');
};

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={[Styles.calendarWrap, className].join(' ')}>
      <span data-testid="day" className={Styles.day}>
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid="month" className={Styles.month}>
        {formatMonthToPTBR(date)}
      </span>
      <span data-testid="year" className={Styles.year}>
        {date.getFullYear()}
      </span>
  </time>
  );
};

export default Calendar;
