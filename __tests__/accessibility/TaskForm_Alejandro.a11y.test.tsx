import React from 'react';
import { render } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm - Accesibilidad (Alejandro)', () => {

  /**
   * Verifica que el campo de entrada pueda ser identificado
   * correctamente mediante su accessibilityLabel.
   */
  it('debe permitir identificar el campo del título mediante accessibilityLabel', async () => {

    const { getByLabelText } = await render(
      <TaskForm onSubmit={jest.fn()} />
    );

    expect(getByLabelText('Título de la tarea')).toBeTruthy();

  });

  /**
   * Verifica que el usuario pueda localizar el campo
   * utilizando el placeholder mostrado en pantalla.
   */
  it('debe mostrar un placeholder descriptivo para el campo del título', async () => {

    const { getByPlaceholderText } = await render(
      <TaskForm onSubmit={jest.fn()} />
    );

    expect(
      getByPlaceholderText('Escribe el título de la tarea')
    ).toBeTruthy();

  });

  /**
   * Verifica que el botón principal del formulario
   * exponga correctamente el rol accesible de botón.
   */
  it('debe exponer el botón Guardar con un rol accesible', async () => {

    const { getByRole } = await render(
      <TaskForm onSubmit={jest.fn()} />
    );

    expect(getByRole('button')).toBeTruthy();

  });

});