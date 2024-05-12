import { ZodError } from 'zod';
import { createCitizenReportRequest } from '../model/citizenReport';
import { GetServerSideProps, NextPage, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Text from '../components/molecules/Text';
import { CitizenReportForm } from '../components/organisms/CitizenReport/Forms/CitizensReportForm';
import { CRQuestion } from '@prisma/client';

interface ServerSideProps {
  questions: Array<CRQuestion>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx: GetServerSidePropsContext
) => {
  // get questions from api/admin/crquestions

  try {
    //TODO: separate this into his own thing not in admin
    const res: AxiosResponse = await axios.get(
      `${process.env.BASE_URL}/api/admin/crquestions`,
      {}
    );
    //return array of questions
    return {
      props: {
        questions: res.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        questions: [],
      },
    };
  }
};

const CitizenReport: NextPage<ServerSideProps> = ({ questions }) => {
  //handlers
  const handleSubmit = (ans: [String], lat: Number, long: Number) => {
    //send ans to api
    axios.post('/api/citizenreport', {
      latitude: lat,
      longitude: long,
      answers: questions.map(({ id }, i) => ({
        questionId: id,
        answer: ans[i],
      })),
    });
  };

  return (
    <div>
      <CitizenReportForm handleSubmit={handleSubmit} questions={questions} />
    </div>
  );
};

export default CitizenReport;
