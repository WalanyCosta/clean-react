import { SurveyModel } from '@/domain/model';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Footer, Header, Icon, IconName } from '@/presentation/components';

import React, { useEffect, useState } from 'react';
import { SurveyItem, SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props ={
  loadSurveyList?: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  });

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ surveys }));
  }, []);

  return (
    <div className={Styles.surveyListWrap} data-testid='surveyList'>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {
            state.surveys.length
              ? (
                  state.surveys.map((survey: SurveyModel) => <SurveyItem survey={survey}/>)
                )
              : (
                  <SurveyItemEmpty />
                )
          }
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
