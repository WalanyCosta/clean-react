import { SurveyModel } from '@/domain/model';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Footer, Header } from '@/presentation/components';
import React, { useEffect, useState } from 'react';
import { SurveyContext, SurveyListItem, SurveyError } from './components';
import Styles from './survey-list-styles.scss';

type Props ={
  loadSurveyList?: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [],
    error: '',
    reload: false
  });

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState(old => ({ ...old, surveys })); })
      .catch(error => { setState(old => ({ ...old, error: error.message })); });
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap} data-testid='surveyList'>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? (<SurveyError />) : (<SurveyListItem />)}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
