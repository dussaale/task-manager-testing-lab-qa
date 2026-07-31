import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';

describe('Suite de pruebas de Alejandro - TaskCard', () => {

  const tareaPendiente = {
    id: '1',
    title: 'Preparar informe QA',
    status: 'pending' as const,
  };

  const tareaCompletada = {
    id: '2',
    title: 'Ejecutar pruebas unitarias',
    status: 'completed' as const,
  };

  it('debe mostrar correctamente el título de la tarea', async () => {

    await render(
      <TaskCard
        task={tareaPendiente}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('Preparar informe QA')).toBeTruthy();

  });

  it('debe mostrar el estado Pendiente cuando la tarea no está completada', async () => {

    await render(
      <TaskCard
        task={tareaPendiente}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('○ Pendiente')).toBeTruthy();

  });

  it('debe mostrar el estado Completada cuando la tarea está completada', async () => {

    await render(
      <TaskCard
        task={tareaCompletada}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText('✓ Completada')).toBeTruthy();

  });

  it('debe llamar a onDelete con el id correcto cuando se presiona Eliminar', async () => {

    const mockOnDelete = jest.fn();

    await render(
      <TaskCard
        task={tareaPendiente}
        onDelete={mockOnDelete}
      />
    );

    await fireEvent.press(screen.getByText('Eliminar'));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith('1');

  });

});
