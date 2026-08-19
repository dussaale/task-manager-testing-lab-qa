import { z } from 'zod';

/**
 * Contrato de la solicitud para POST /tasks
 */
export const CreateTaskRequestSchema = z.object({
  title: z.string().min(1),
});

/**
 * Contrato de la respuesta esperada de POST /tasks
 */
export const CreateTaskResponseSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  status: z.enum(['pending', 'completed']),
  createdAt: z.string().datetime().optional(),
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
export type CreateTaskResponse = z.infer<typeof CreateTaskResponseSchema>;