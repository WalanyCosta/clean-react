import React from 'react';
import { SurveyModel } from '@/domain/model';
import { Icon, IconName, Calendar } from '@/presentation/components';

import Styles from './item-styles.scss';
import { Link } from 'react-router-dom';

type Props = {
  survey: SurveyModel;
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;
  return (
    <li className={Styles.surveyItemWrap}>
    <div className={Styles.surveyContent}>
      <Icon
        iconName={iconName}
        className={Styles.iconWrap}
      />
      <Calendar date={survey.date} className={Styles.calendarWrap}/>
      <p data-testid="question">{survey.question}</p>
    </div>
    <footer><Link data-testid='link' to={`surveys/${survey.id}`}>Ver resultado</Link></footer>
  </li>
  );
};

export default SurveyItem;
