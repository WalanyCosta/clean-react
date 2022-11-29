import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Error, Footer, Header } from '@/presentation/components';
import React, { useEffect, useState } from 'react';
import { SurveyContext, SurveyListItem } from './components';
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

  const handReload = (): void => {
    setState(old => ({ surveys: [], error: '', reload: !old.reload }));
  };

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
          {state.error ? (<Error error={state.error} reload={handReload}/>) : (<SurveyListItem />)}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
