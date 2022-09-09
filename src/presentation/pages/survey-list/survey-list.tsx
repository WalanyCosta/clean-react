import { Footer, Header, Icon, IconName } from '@/presentation/components';
import React from 'react';
import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon
                iconName={IconName.thumbDown}
                className={Styles.iconWrap}
              />
              <time>
                <span className={Styles.day}>07</span>
                <span className={Styles.month}>09</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é a melhor linguagem?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
