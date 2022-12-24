import React, { useEffect, useState } from 'react';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import Styles from './survey-result-styles.scss';
import { SurveyModel } from '@/domain/model';
import { LoadSurveyResult } from '@/domain/usecases';
import { SurveyResultData } from './components';

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    error: '',
    isLoading: false,
    surveyResult: null as SurveyModel,
    reload: false
  });

  const handReload = (): void => {
    setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }));
  };

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(old => ({ ...old, surveyResult })); })
      .catch(error => { setState(old => ({ ...old, error: error.message, surveyResult: null })); });
  }, [state.reload]);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={Styles.contentWrap}>
        { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={handReload} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
