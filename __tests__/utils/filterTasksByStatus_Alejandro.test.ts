import { filterTasksByStatus } from '../../src/utils/filterTasks';
import { Task } from '../../src/types';

describe(' suite Alejandro filterTasksByStatus', () => {

  const taskList: Task[] = [
    {
      id: '101',
      title: 'Diseñar casos de prueba',
      status: 'pending'
    },
    {
      id: '102',
      title: 'Implementar pruebas unitarias',
      status: 'completed'
    },
    {
      id: '103',
      title: 'Revisar cobertura',
      status: 'pending'
    },
    {
      id: '104',
      title: 'Documentar resultados',
      status: 'completed'
    }
  ];

  it('debe devolver un arreglo vacío cuando no existen tareas para filtrar', () => {

  const result = filterTasksByStatus([], 'pending');

  expect(result).toEqual([]);

});

it('debe devolver únicamente las tareas pendientes', () => {

  const result = filterTasksByStatus(taskList, 'pending');

  expect(result).toEqual([
    {
      id: '101',
      title: 'Diseñar casos de prueba',
      status: 'pending'
    },
    {
      id: '103',
      title: 'Revisar cobertura',
      status: 'pending'
    }
  ]);
const titles = result.map(task => task.title);

expect(titles).toContain('Diseñar casos de prueba');

});

it('debe devolver únicamente las tareas completadas', () => {

  const result = filterTasksByStatus(taskList, 'completed');

  expect(result).toEqual([
    {
      id: '102',
      title: 'Implementar pruebas unitarias',
      status: 'completed'
    },
    {
      id: '104',
      title: 'Documentar resultados',
      status: 'completed'
    }
  ]);

});
  
it('debe devolver todas las tareas cuando el filtro es "all"', () => {

  const result = filterTasksByStatus(taskList, 'all');

  expect(result).toEqual(taskList);

});

it('debe lanzar un error cuando el estado del filtro no es válido', () => {

  expect(() =>
    filterTasksByStatus(taskList, 'cancelled' as any)
  ).toThrow('Estado inválido: cancelled');

});
it('debe devolver todas las tareas cuando todas tienen estado completed', () => {

  const completedTasks: Task[] = [
    {
      id: '201',
      title: 'Ejecutar pruebas de regresión',
      status: 'completed'
    },
    {
      id: '202',
      title: 'Actualizar documentación',
      status: 'completed'
    }
  ];

  const result = filterTasksByStatus(completedTasks, 'completed');

  expect(result).toEqual(completedTasks);
  expect(result).toHaveLength(2);

});

it('debe devolver todas las tareas cuando todas tienen estado completed', () => {

  const completedTasks: Task[] = [
    {
      id: '201',
      title: 'Ejecutar pruebas de regresión',
      status: 'completed'
    },
    {
      id: '202',
      title: 'Actualizar documentación',
      status: 'completed'
    }
  ];

  const result = filterTasksByStatus(completedTasks, 'completed');

  expect(result).toEqual(completedTasks);
  expect(result).toHaveLength(2);

});
});












