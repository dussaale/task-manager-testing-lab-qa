import React from 'react';
import { render } from '@testing-library/react-native';
import { ConfirmDeleteDialog } from '../../src/components/ConfirmDeleteDialog';

describe('ConfirmDeleteDialog - Accesibilidad (Alejandro)', () => {

  /**
   * Verifica que el diálogo de confirmación
   * sea visible cuando la propiedad visible es true.
   */
  it('debe mostrar el diálogo cuando visible es true', async () => {

    const { getByText } = await render(
      <ConfirmDeleteDialog
        visible={true}
        taskTitle="Comprar leche"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(
      getByText('Eliminar tarea')
    ).toBeTruthy();

  });

  /**
   * Verifica que el nombre de la tarea
   * sea mostrado al usuario antes de eliminarla.
   */
  it('debe mostrar el nombre de la tarea a eliminar', async () => {

    const { getByText } = await render(
      <ConfirmDeleteDialog
        visible={true}
        taskTitle="Comprar leche"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(
      getByText(/Comprar leche/i)
    ).toBeTruthy();

  });

  /**
   * Verifica que el botón Cancelar
   * sea identificado correctamente mediante accessibilityLabel.
   */
  it('debe identificar correctamente el botón Cancelar', async () => {

    const { getByLabelText } = await render(
      <ConfirmDeleteDialog
        visible={true}
        taskTitle="Comprar leche"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(
      getByLabelText('Cancelar')
    ).toBeTruthy();

  });

  /**
   * Verifica que el botón Confirmar eliminación
   * sea identificado correctamente mediante accessibilityLabel.
   */
  it('debe identificar correctamente el botón Confirmar eliminación', async () => {

    const { getByLabelText } = await render(
      <ConfirmDeleteDialog
        visible={true}
        taskTitle="Comprar leche"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(
      getByLabelText('Confirmar eliminación')
    ).toBeTruthy();

  });

});