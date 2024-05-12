import { CRQuestion } from '@prisma/client';
import { z } from 'zod';

export const createCrQuestionSchema = z.object({
  priority: z.number(),
  hidden: z.boolean(),
  question: z.string(),
});

export const deleteCrQuestionSchema = z.object({
  id: z.string().uuid(),
});

export const updateCrQuestionsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    priority: z.number(),
    hidden: z.boolean(),
    question: z.string(),
  })
);
