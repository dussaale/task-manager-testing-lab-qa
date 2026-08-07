import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CheckoutScreen } from '../../src/screens/CheckoutScreen';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CheckoutScreen />
    </SafeAreaProvider>
  );
  const fill = (testID: string, value: string) =>
  fireEvent.changeText(screen.getByTestId(testID), value);

const fillAll = async (entries: [string, string][]) => {
  for (const [testID, value] of entries) {
    await fill(testID, value);
  }
};

describe('CheckoutScreen - Accesibilidad (Alejandro)', () => {

  /**
   * Caso de prueba: ACC-001
   *
   * Objetivo:
   * Verificar que el botón principal del flujo transaccional
   * sea identificado correctamente como un botón accesible.
   */
  it('ACC-001 - el botón Confirmar pago debe tener el rol accessibilityRole="button"', async () => {

    await renderScreen();

    const button = screen.getByRole('button', {
      name: 'Confirmar pago',
    });

    expect(button).toBeTruthy();

  });

  /**
   * Caso de prueba: ACC-002
   *
   * Objetivo:
   * Verificar que todos los campos principales del formulario
   * se encuentren disponibles para el usuario.
   */
  it('ACC-002 - todos los campos del formulario deben estar disponibles', async () => {

    await renderScreen();

    expect(screen.getByTestId('input-nombre')).toBeTruthy();
    expect(screen.getByTestId('input-email')).toBeTruthy();
    expect(screen.getByTestId('input-telefono')).toBeTruthy();

    expect(screen.getByTestId('input-direccion')).toBeTruthy();
    expect(screen.getByTestId('input-ciudad')).toBeTruthy();
    expect(screen.getByTestId('input-codigo-postal')).toBeTruthy();

    expect(screen.getByTestId('input-titular')).toBeTruthy();
    expect(screen.getByTestId('input-numero-tarjeta')).toBeTruthy();
    expect(screen.getByTestId('input-vencimiento')).toBeTruthy();
    expect(screen.getByTestId('input-cvv')).toBeTruthy();

  });

  /**
 * Caso de prueba: ACC-003
 *
 * Objetivo:
 * Verificar que el formulario muestre un mensaje de validación
 * cuando el usuario intenta confirmar una compra incompleta.
 */
it('ACC-003 - debe mostrar un mensaje de validación accesible cuando existen campos vacíos', async () => {

  await renderScreen();

  fireEvent.press(
    screen.getByText('Confirmar pago')
  );

  await waitFor(() => {
    expect(
      screen.getByText('Completa todos los campos antes de continuar')
    ).toBeTruthy();
  });

});
/**
 * Caso de prueba: ACC-004
 *
 * Objetivo:
 * Verificar que el usuario reciba un mensaje de confirmación
 * visible después de completar correctamente el proceso de compra.
 */
it('ACC-004 - debe mostrar un mensaje de confirmación accesible al finalizar la compra', async () => {

  await renderScreen();

  await fillAll([
    ['input-nombre', 'Alejandro Dussan'],
    ['input-email', 'alejandro.dussan@correo.com'],
    ['input-telefono', '3105558899'],
    ['input-direccion', 'Carrera 45 #120-35'],
    ['input-ciudad', 'Medellín'],
    ['input-codigo-postal', '050021'],
    ['input-titular', 'Alejandro Dussan'],
    ['input-numero-tarjeta', '4111111111111111'],
    ['input-vencimiento', '12/28'],
    ['input-cvv', '123'],
  ]);

  fireEvent.press(
    screen.getByText('Confirmar pago')
  );

  await waitFor(() => {
    expect(
      screen.getByText('Transacción completada exitosamente')
    ).toBeTruthy();
  });

});

});