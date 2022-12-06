import React, { useEffect, useState } from 'react';
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components';
import FlipMove from 'react-flip-move';
import Styles from './survey-result-styles.scss';
import { SurveyModel } from '@/domain/model';
import { LoadSurveyResult } from '@/domain/usecases';

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    error: '',
    isLoading: false,
    surveyResult: null as SurveyModel
  });

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch();
  });
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={Styles.contentWrap}>
        { state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é seu frameWork favorito?Qual é seu frameWork favorito?</h2>
            </hgroup>
            <FlipMove className={Styles.answerList}>
              <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
                <span className={Styles.answer}>Reactjs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
                <span className={Styles.answer}>Reactjs</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
                <span className={Styles.answer}>Reactjs</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
