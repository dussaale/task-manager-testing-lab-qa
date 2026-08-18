import { TaskApiResponseSchema } from '../../src/schemas/taskApi_Alejandro.schema';

describe('Contrato API de Task Manager - Alejandro', () => {
  /**
   * Contrato del endpoint GET /tasks
   *
   * La respuesta esperada es un arreglo de tareas.
   * Cada tarea contiene:
   * - id: string
   * - title: string no vacío
   * - status: "pending" | "completed"
   * - createdAt: string ISO opcional
   */

  it('CONTRACT-001 - debe aceptar una respuesta válida de GET /tasks', () => {
    const validResponse = [
      {
        id: '1',
        title: 'Preparar informe de QA',
        status: 'pending',
      },
      {
        id: '2',
        title: 'Ejecutar pruebas',
        status: 'completed',
        createdAt: '2026-08-18T10:30:00.000Z',
      },
    ];

    const result = TaskApiResponseSchema.safeParse(validResponse);

    expect(result.success).toBe(true);
  });

  it('CONTRACT-002 - debe rechazar una respuesta inválida cuando id tiene un tipo incorrecto', () => {
    const invalidResponse = [
      {
        id: 123,
        title: 'Preparar informe de QA',
        status: 'pending',
      },
    ];

    const result = TaskApiResponseSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
  });

  it('CONTRACT-003 - debe rechazar una respuesta con un status no permitido por el contrato', () => {
    const invalidResponse = [
      {
        id: '3',
        title: 'Revisar contrato',
        status: 'archived',
      },
    ];

    const result = TaskApiResponseSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
  });
});