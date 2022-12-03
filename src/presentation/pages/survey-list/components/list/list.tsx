import React, { useContext } from 'react';
import { SurveyModel } from '@/domain/model';
import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components';

import Styles from './list-styles.scss';

type Props ={
  surveys: SurveyModel[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      { surveys.length
        ? (
            surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey}/>)
          )
        : (
          <SurveyItemEmpty />
          )
      }
    </ul>
  );
};

export default List;
