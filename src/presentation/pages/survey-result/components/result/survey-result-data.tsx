import React from 'react';
import Styles from './survey-result-data-styles.scss';
import { Calendar } from '@/presentation/components';
import FlipMove from 'react-flip-move';
import { SurveyModel } from '@/domain/model';
import { useNavigate } from 'react-router-dom';
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components';

type Props = {
  surveyResult: SurveyModel
}

const SurveyResultData: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate();

  return (
    <>
            <hgroup>
              <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
              <h2 data-testid='question'>{surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid='answers' className={Styles.answerList}>
              <>
                {surveyResult.answers.map(answer => (
                  <SurveyResultAnswer key={answer.answer} answer={answer}/>
                ))}
              </>
            </FlipMove>
            <button
                className={Styles.button}
                data-testid='back-button'
                onClick={() => navigate(-1)}
            >Voltar</button>
    </>
  );
};

export default SurveyResultData;
