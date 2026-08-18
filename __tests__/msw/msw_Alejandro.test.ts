import { fetchTasks } from '../../src/services/taskService';
import { createTask } from '../../src/services/taskService';
import { resetTasks } from '../../src/mocks/handlers';

describe('MSW - Validación de configuración (Alejandro)', () => {

  beforeEach(() => {
    resetTasks();
  });

  it('debe interceptar una petición GET y devolver las tareas creadas mediante MSW', async () => {

    await createTask('Tarea existente');
    await createTask('Segunda tarea');

    const tasks = await fetchTasks();

    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Tarea existente');
    expect(tasks[1].title).toBe('Segunda tarea');

  });

});