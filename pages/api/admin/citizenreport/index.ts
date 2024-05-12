import { NextApiHandler } from 'next';
import { z, ZodError } from 'zod';

import { prismaClient } from '../../../../server/prisma/client';
import {
  getCitizenReportRequest,
  updateCitizenReportRequest,
} from '../../../../model/citizenReport';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const parseResult = getCitizenReportRequest.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const { skip, take } = parseResult.data;
    const citizenReports = await prismaClient.citizenReport.findMany({
      skip,
      take,
    });
    return res.status(200).json(citizenReports);
  }

  if (req.method === 'PUT') {
    const parseResult = updateCitizenReportRequest.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const { id, verified } = parseResult.data;

    const citizenReportUpdate = await prismaClient.citizenReport.update({
      where: { id },
      data: { verified },
    });
    return res.status(200).json(citizenReportUpdate);
  }

  return res.status(404).json({ error: `Method ${req.method} unimplemented` });
};

export default handler;
