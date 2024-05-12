import { CitizenReport } from '@prisma/client';
import { z } from 'zod';

export const getCitizenReportRequest = z.object({
  skip: z.string().transform((val, ctx) => {
    const parsed = parseInt(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Not a number',
      });
      return z.NEVER;
    }
    return parsed;
  }),
  take: z.string().transform((val, ctx) => {
    const parsed = parseInt(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Not a number',
      });
      return z.NEVER;
    }
    return parsed;
  }),
});

export const updateCitizenReportRequest = z.object({
  id: z.string().uuid(),
  verified: z.boolean(),
});

export const createCitizenReportRequest = z.object({
  latitude: z.number(),
  longitude: z.number(),
  takenById: z.string().uuid().optional(),
  contactInfo: z.string().optional(),
  ip: z.string().optional(),

  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      answer: z.string().optional(),
      attachment: z.string().url().optional(),
    })
  ),
});
