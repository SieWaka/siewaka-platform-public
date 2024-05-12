import { NextApiHandler } from 'next';
import { z, ZodError } from 'zod';
import getUserDataFromReq from '../../../utils/getUserDataFromReq';
import { prismaClient } from '../../../server/prisma/client';
import { createCitizenReportRequest } from '../../../model/citizenReport';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const parseResult = createCitizenReportRequest.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    let { answers, ...citizenReport } = parseResult.data;

    const userData = await getUserDataFromReq(req);
    if (userData) {
      citizenReport.takenById = userData.id;
    }

    const citizenReportInsertResult = await prismaClient.citizenReport.create({
      data: citizenReport,
    });

    const answerInsertResult = await prismaClient.$transaction(
      answers.map((answer) =>
        prismaClient.cRAnswer.create({
          data: {
            reportId: citizenReportInsertResult.id,
            ...answer,
          },
        })
      )
    );

    return res.status(200).json({
      ...citizenReportInsertResult,
      answerInsertResult,
    });
  }

  return res.status(404).json({ error: `Method ${req.method} unimplemented` });
};

export default handler;
