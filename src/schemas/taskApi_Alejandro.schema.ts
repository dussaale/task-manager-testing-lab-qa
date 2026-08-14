import { z } from 'zod';

export const TaskApiResponseSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string().min(1),
    status: z.enum(['pending', 'completed']),
    createdAt: z.string().datetime().optional(),
  })
);

export type TaskApiResponse = z.infer<typeof TaskApiResponseSchema>;