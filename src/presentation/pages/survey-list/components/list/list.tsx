import React, { useContext } from 'react';
import { SurveyModel } from '@/domain/model';
import { SurveyItemEmpty, SurveyItem, SurveyContext } from '@/presentation/pages/survey-list/components';

import Styles from './list-styles.scss';

const List: React.FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      { state.surveys.length
        ? (
            state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey}/>)
          )
        : (
          <SurveyItemEmpty />
          )
      }
    </ul>
  );
};

export default List;
