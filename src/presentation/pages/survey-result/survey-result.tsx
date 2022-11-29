import React from 'react';
import { Calendar, Footer, Header, Loading } from '@/presentation/components';
import FlipMove from 'react-flip-move';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap} />
          <h2>Qual é seu frameWork favorito?</h2>
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
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
