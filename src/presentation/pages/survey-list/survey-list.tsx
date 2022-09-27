import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Footer, Header, Icon, IconName } from '@/presentation/components';

import React, { useEffect } from 'react';
import { SurveyItem, SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props ={
  loadSurveyList?: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll();
    })();
  }, []);

  return (
    <div className={Styles.surveyListWrap} data-testid='surveyList'>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
