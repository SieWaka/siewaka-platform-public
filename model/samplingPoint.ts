import { AreaType, SamplingPoint, WaterBodyType } from '@prisma/client';
import { z } from 'zod';

export const createSamplingPointSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  countryId: z.string().uuid().optional(),
  waterBodyType: z.nativeEnum(WaterBodyType),
  areaType: z.nativeEnum(AreaType),
});

export const updateSamplingPointSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  countryId: z.string().uuid().optional(),
  waterBodyType: z.nativeEnum(WaterBodyType).optional(),
  areaType: z.nativeEnum(AreaType).optional(),
});

export type GetSamplingPointsResponse = SamplingPoint[];

export type GetSamplingPointResponse = GetSamplingPointsResponse[0];
