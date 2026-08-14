import { TaskSchema, TaskListSchema } from '../../src/schemas/taskSchema';

describe('Contrato API de Task Manager - Alejandro', () => {
  /**
   * CONTRATO:
   * GET /tasks
   *
   * La API debe devolver un arreglo de tareas.
   * Cada tarea debe contener:
   * - id: string
   * - title: string no vacío
   * - status: "pending" | "completed"
   * - createdAt: string ISO opcional
   */

  it('debe aceptar una respuesta válida de GET /tasks', () => {
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
      },
    ];

    const result = TaskListSchema.safeParse(validResponse);

    expect(result.success).toBe(true);
  });

  it('debe rechazar una respuesta inválida de GET /tasks', () => {
    const invalidResponse = [
      {
        id: 123,
        title: 'Preparar informe de QA',
        status: 'pending',
      },
    ];

    const result = TaskListSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
  });

  it('debe rechazar una tarea con un status que no pertenece al contrato', () => {
    const invalidTask = {
      id: '3',
      title: 'Revisar contrato',
      status: 'archived',
    };

    const result = TaskSchema.safeParse(invalidTask);

    expect(result.success).toBe(false);
  });
});