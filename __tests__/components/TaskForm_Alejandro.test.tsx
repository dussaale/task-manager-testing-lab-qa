import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('Suite de pruebas de Alejandro - TaskForm', () => {

  it('debe renderizar correctamente el formulario', async () => {

    await render(<TaskForm onSubmit={jest.fn()} />);

    expect(screen.getByTestId('input-titulo')).toBeTruthy();
    expect(screen.getByText('Guardar')).toBeTruthy();

  });

  it('debe permitir escribir el título de una tarea', async () => {

    await render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByLabelText('Título de la tarea');

    await fireEvent.changeText(input, 'Preparar informe QA');

    expect(input.props.value).toBe('Preparar informe QA');

  });

  it('debe llamar a onSubmit cuando el usuario presiona Guardar con un título válido', async () => {

    const mockOnSubmit = jest.fn();

    await render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Escribe el título de la tarea');

    await fireEvent.changeText(input, 'Preparar informe QA');

    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('Preparar informe QA');

  });

  it('no debe llamar a onSubmit cuando el título está vacío', async () => {

    const mockOnSubmit = jest.fn();

    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();

  });

});
