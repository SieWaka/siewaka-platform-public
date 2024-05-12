import { NextApiHandler } from 'next';
import { z, ZodError } from 'zod';

import { prismaClient } from '../../../../server/prisma/client';
import {
  createCrQuestionSchema,
  updateCrQuestionsSchema,
  deleteCrQuestionSchema,
} from '../../../../model/crQuestion';

const handler: NextApiHandler = async (req, res) => {
  // TODO(gerardo): investigar que sucede con next si algo aqui regresa
  // una excepcion. creo que solo regresa 500.

  if (req.method === 'GET') {
    const questions = await prismaClient.cRQuestion.findMany();

    return res.status(200).json(questions);
  }

  if (req.method === 'POST') {
    try {
      createCrQuestionSchema.parse(req.body);
    } catch (e) {
      return res.status(400).json({ error: (e as ZodError).issues });
    }

    const body = req.body as z.infer<typeof createCrQuestionSchema>;

    const response = await prismaClient.cRQuestion.create({
      data: {
        priority: body.priority,
        hidden: body.hidden,
        question: body.question,
      },
    });

    return res.status(200).json(response);
  }

  if (req.method === 'PUT') {
    try {
      updateCrQuestionsSchema.parse(req.body);
    } catch (e) {
      return res.status(400).json({ error: (e as ZodError).issues });
    }

    const body = req.body as z.infer<typeof updateCrQuestionsSchema>;

    const dbResponse = await prismaClient.$transaction(
      body.map((question) =>
        prismaClient.cRQuestion.update({
          where: {
            id: question.id,
          },
          data: {
            priority: question.priority,
            hidden: question.hidden,
            question: question.question,
          },
        })
      )
    );

    return res.status(200).json(dbResponse);
  }

  if (req.method === 'DELETE') {
    try {
      deleteCrQuestionSchema.parse(req.query);
    } catch (e) {
      return res.status(400).json({ error: (e as ZodError).issues });
    }

    const query = req.query as z.infer<typeof deleteCrQuestionSchema>;

    const response = await prismaClient.cRQuestion.delete({
      where: {
        id: query.id,
      },
    });

    return res.status(200).json(response);
  }
};

export default handler;
