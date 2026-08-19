import {
  CreateTaskRequestSchema,
  CreateTaskResponseSchema,
} from '../../src/schemas/createTask_Alejandro.schema';

describe('Contrato API de Task Manager - POST /tasks - Alejandro', () => {
  /**
   * CONTRACT-004
   * Verifica que la solicitud enviada para crear una tarea
   * cumpla con el contrato esperado.
   */
  it('CONTRACT-004 - debe aceptar una solicitud válida para POST /tasks', () => {
    const validRequest = {
      title: 'Preparar evidencia de pruebas',
    };

    const result = CreateTaskRequestSchema.safeParse(validRequest);

    expect(result.success).toBe(true);
  });

  /**
   * CONTRACT-005
   * Verifica que la respuesta del endpoint POST /tasks
   * cumpla con el contrato esperado.
   */
  it('CONTRACT-005 - debe aceptar una respuesta válida de POST /tasks', () => {
    const validResponse = {
      id: '3',
      title: 'Preparar evidencia de pruebas',
      status: 'pending',
      createdAt: '2026-08-19T10:30:00.000Z',
    };

    const result = CreateTaskResponseSchema.safeParse(validResponse);

    expect(result.success).toBe(true);
  });

  /**
   * CONTRACT-006
   * Verifica que se rechace una respuesta inválida,
   * por ejemplo cuando el identificador no es un string.
   */
  it('CONTRACT-006 - debe rechazar una respuesta con id de tipo incorrecto', () => {
    const invalidResponse = {
      id: 3,
      title: 'Preparar evidencia de pruebas',
      status: 'pending',
    };

    const result = CreateTaskResponseSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
  });

  /**
   * CONTRACT-007
   * Verifica que se rechace una solicitud sin título válido.
   */
  it('CONTRACT-007 - debe rechazar una solicitud con título vacío', () => {
    const invalidRequest = {
      title: '',
    };

    const result = CreateTaskRequestSchema.safeParse(invalidRequest);

    expect(result.success).toBe(false);
  });
});