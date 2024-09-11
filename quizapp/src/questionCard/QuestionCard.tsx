import React from 'react';
// Types
import { AnswerObject } from '../App';

import { Wrapper, ButtonWrapper } from '../questionCard/QuestionCard.styles';

type QuestionCardProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <Wrapper>
      <p >
        Question: {questionNr} / {totalQuestions}
      </p>
      <p >{question}</p>
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            $correct={userAnswer?.correctAnswer === answer}
            $userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={!!userAnswer}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
