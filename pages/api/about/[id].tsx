import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prismaClient } from '../../../server/prisma/client';
import availableMethodsHandler from '../../../utils/availableMethodsHandler';

const availableMethods = ['POST', 'PUT', 'DELETE'];

const handler: NextApiHandler = async (req, res) => {
  if (!availableMethodsHandler(req, res, availableMethods)) {
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing id' });
    return;
  }

  if (typeof id !== 'string') {
    res.status(400).json({ error: `sampling point id must be a string` });
    return;
  }

  const { method } = req;

  if (method === 'POST') {
    await postHandler(req, res, id);
  }

  if (method === 'PUT') {
    await putHandler(req, res, id);
  }

  if (method === 'DELETE') {
    await deleteHandler(req, res, id);
  }
};
async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
): Promise<any> {
  const schema = z.object({
    text: z.string(),
  });
  const queryParse = schema.safeParse(req.body);
  if (!queryParse.success) {
    return res.status(400).send(queryParse.error.message);
  }

  const { text } = queryParse.data;

  try {
    await prismaClient.about.create({
      data: {
        id,
        text,
      },
    });
  } catch (e) {
    return res.status(400).json({ message: 'Duplicated ID' });
  }

  return res.status(200).end();
}

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
): Promise<any> {
  try {
    await prismaClient.about.delete({ where: { id: id } });
  } catch (e) {
    return res.status(404).end();
  }
  return res.status(200).end();
}

async function putHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
  id: string
): Promise<any> {
  const schema = z.object({
    text: z.string().max(5120),
  });

  const queryParse = schema.safeParse(req.body);
  if (!queryParse.success) {
    const errorMessage = queryParse.error.issues[0].message;
    return res.status(400).send(errorMessage);
  }
  const { text } = queryParse.data;

  try {
    await prismaClient.about.upsert({
      where: { id },
      update: {
        text,
      },
      create: {
        id,
        text,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).end();
}

export default handler;
