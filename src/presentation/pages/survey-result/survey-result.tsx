import React from 'react';
import { Footer, Header, Loading } from '@/presentation/components';
import FlipMove from 'react-flip-move';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu frameWork favorito?</h2>
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
