import React from 'react';
import { SurveyModel } from '@/domain/model';
import { Icon, IconName } from '@/presentation/components';

import Styles from './item-styles.scss';

type Props = {
  survey: SurveyModel
}

const formatMonthToPTBR = (date: Date): string => {
  const month = new Intl.DateTimeFormat('pt-br', { month: 'short' });
  return month.format(date).replace('.', '');
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;
  const date = new Date(survey.date);
  return (
    <li className={Styles.surveyItemWrap} key={survey.id}>
    <div className={Styles.surveyContent}>
      <Icon
        iconName={iconName}
        className={Styles.iconWrap}
      />
      <time>
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
      <p data-testid="question">{survey.question}</p>
    </div>
    <footer>Ver resultado</footer>
  </li>
  );
};

export default SurveyItem;
