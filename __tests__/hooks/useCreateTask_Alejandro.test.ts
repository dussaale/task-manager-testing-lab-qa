import { renderHook, act } from '@testing-library/react-native';
import { useCreateTask } from '../../src/hooks/useCreateTask';
import * as taskService from '../../src/services/taskService';


// Se realiza un mock del servicio para aislar la dependencia externa.
// De esta manera las pruebas validan únicamente la lógica del hook,
// sin depender de la disponibilidad o comportamiento de la API.

jest.mock('../../src/services/taskService');

describe('Suite de pruebas de Alejandro - useCreateTask', () => {

  it(' debe inicializar el hook con estado idle y sin tareas', async () => {

    const { result } = await renderHook(() => useCreateTask());

    expect(result.current.status).toBe('idle');
    expect(result.current.tasks).toEqual([]);

  });

  it(' debe crear una tarea correctamente y cambiar el estado a success', async () => {

    // Se simula una respuesta exitosa del servicio para verificar
// que el hook actualiza correctamente el estado y la lista de tareas.
    jest.mocked(taskService.createTask).mockResolvedValue({
      id: '100',
      title: 'Preparar informe QA',
      status: 'pending',
    });

    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Preparar informe QA');
    });

    expect(result.current.status).toBe('success');
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Preparar informe QA');
    expect(result.current.tasks[0].status).toBe('pending');

  });

  it('debe cambiar el estado a error cuando el servicio falla', async () => {

    // Se simula un fallo del servicio para comprobar que el hook
// cambia el estado a "error" cuando ocurre una excepción.
  jest.mocked(taskService.createTask).mockRejectedValue(
    new Error('Error de conexión con el servidor')
  );

  const { result } = await renderHook(() => useCreateTask());

  await act(async () => {
    await result.current.submit('Preparar informe QA');
  });

  expect(result.current.status).toBe('error');
  expect(result.current.tasks).toEqual([]);

});

});
