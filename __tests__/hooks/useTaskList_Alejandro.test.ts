import { renderHook, act } from '@testing-library/react-native';
import { useTaskList } from '../../src/hooks/useTaskList';

describe('Suite de pruebas de Alejandro - useTaskList', () => {

  it('debe inicializar el hook con una lista vacía y sin errores', async () => {

    const { result } = await renderHook(() => useTaskList());

    expect(result.current.tasks).toEqual([]);
    expect(result.current.taskCount).toBe(0);
    expect(result.current.error).toBeNull();

  });

  it('debe agregar una nueva tarea correctamente', async () => {

  const { result } = await renderHook(() => useTaskList());

  await act(() => {
    result.current.addTask('Documentar resultados de pruebas');
  });

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.taskCount).toBe(1);
  expect(result.current.tasks[0].title).toBe('Documentar resultados de pruebas');
  expect(result.current.tasks[0].status).toBe('pending');
  expect(result.current.error).toBeNull();

});

it(' debe eliminar una tarea existente correctamente', async () => {

  const { result } = await renderHook(() => useTaskList());

  await act(() => {
    result.current.addTask('Preparar informe de calidad');
  });

  const taskId = result.current.tasks[0].id;

  await act(() => {
    result.current.removeTask(taskId);
  });

  expect(result.current.tasks).toEqual([]);
  expect(result.current.taskCount).toBe(0);
  expect(result.current.error).toBeNull();

});

it(' debe mostrar un error cuando el título de la tarea está vacío', async () => {

  const { result } = await renderHook(() => useTaskList());

  await act(() => {
    result.current.addTask('');
  });

  expect(result.current.tasks).toEqual([]);
  expect(result.current.taskCount).toBe(0);
  expect(result.current.error).toBe('El título no puede estar vacío');

});

it(' debe eliminar los espacios del título antes de guardar la tarea', async () => {

  const { result } = await renderHook(() => useTaskList());

  await act(() => {
    result.current.addTask('     Preparar informe de calidad     ');
  });

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.taskCount).toBe(1);
  expect(result.current.tasks[0].title).toBe('Preparar informe de calidad');
  expect(result.current.error).toBeNull();

});

it(' no debe modificar la lista cuando se intenta eliminar una tarea inexistente', async () => {

  const { result } = await renderHook(() => useTaskList());

  await act(() => {
    result.current.addTask('Preparar informe mensual');
  });

  expect(result.current.taskCount).toBe(1);

  await act(() => {
    result.current.removeTask('id-inexistente');
  });

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.taskCount).toBe(1);
  expect(result.current.tasks[0].title).toBe('Preparar informe mensual');
  expect(result.current.error).toBeNull();

});

});