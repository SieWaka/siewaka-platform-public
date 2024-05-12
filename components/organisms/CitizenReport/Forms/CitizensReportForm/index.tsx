// imports
import { CitizenReportFormProps } from './types';
import InputText from '../../../../molecules/Input/InputText';
import Text from '../../../../molecules/Text';
import { Button } from '../../../../molecules/Buttons/Button';
import { ReactHTML, useEffect, useState } from 'react';
// types - interfaces

// vars

// component

export const CitizenReportForm: React.FC<CitizenReportFormProps> = ({
  handleSubmit,
  questions,
}) => {
  // state
  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
  const [locationAllowed, setLocationallowed] = useState(0);
  //effects '
  let lat = 0,
    long = 0;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        setLocationallowed(1);
      },
      (err) => {
        //TODO: handle err
        setLocationallowed(-1);
      }
    );
  }, []);

  //handlers
  function handleAnsChange(
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) {
    const tempAns = answers;
    tempAns[i] = event.target.value;
    setAnswers(tempAns);
  }

  const handleClick: React.MouseEventHandler = (event) => {
    handleSubmit(answers, lat, long);
  };

  // helpers

  // jsx
  return (
    <div
      style={{ paddingTop: '2em' }}
      className="min-h-screen flex w-full overflow-auto bg-ultra-light-blue"
    >
      <div className="w-full mx-auto px-6 lg:px-8 max-w-5xl">
        {questions.map((question, i) => (
          <div className="space-y-3" key={`ans-${i}`}>
            <Text as="h2">{question.question}</Text>
            <InputText
              className="admin-input rounded-xl truncate-placeholder"
              name={`answer-${i}`}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleAnsChange(event, i)
              }
            />
            <br />
          </div>
        ))}
        <Button disabled={locationAllowed === -1} onClick={handleClick}>
          Enviar Reporte
        </Button>
      </div>
    </div>
  );
};
