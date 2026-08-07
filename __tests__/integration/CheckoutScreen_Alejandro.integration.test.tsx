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

describe('CheckoutScreen - Integración (Alejandro)', () => {

  /**
   * Caso de prueba: INT-CHK-001
   *
   * Objetivo:
   * Verificar que el usuario pueda recuperar el proceso
   * de compra cuando corrige un único dato obligatorio,
   * sin perder la información previamente diligenciada.
   */
  it('INT-CHK-001 - debe recuperar una compra después de corregir el correo electrónico', async () => {

    await renderScreen();

    // El usuario diligencia correctamente todo el formulario
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

    // El usuario elimina accidentalmente el correo
    await fill('input-email', '');

    // Intenta completar la compra
    await fireEvent.press(
      screen.getByText('Confirmar pago')
    );

    // El sistema debe impedir continuar
    expect(
      screen.getByText('Completa todos los campos antes de continuar')
    ).toBeTruthy();

    // El usuario corrige únicamente el correo
    await fill(
      'input-email',
      'alejandro.dussan@correo.com'
    );

    // Intenta nuevamente completar la compra
    await fireEvent.press(
      screen.getByText('Confirmar pago')
    );

    // La compra debe finalizar exitosamente
    await waitFor(() => {
      expect(
        screen.getByText('Transacción completada exitosamente')
      ).toBeTruthy();
    });
    
  });
  /**
   * Caso de prueba: INT-CHK-002
   *
   * Objetivo:
   * Verificar que la compra permanezca bloqueada mientras exista
   * al menos un dato inválido y que únicamente se complete cuando
   * todos los errores hayan sido corregidos.
   */
  it('INT-CHK-002 - debe permitir finalizar la compra únicamente cuando todos los errores son corregidos', async () => {

    await renderScreen();

    // El usuario diligencia el formulario con tres errores
    await fillAll([
      ['input-nombre', 'Alejandro Dussan'],
      ['input-email', 'correo-invalido'],
      ['input-telefono', 'ABC123'],
      ['input-direccion', 'Carrera 45 #120-35'],
      ['input-ciudad', 'Medellín'],
      ['input-codigo-postal', '050021'],
      ['input-titular', 'Alejandro Dussan'],
      ['input-numero-tarjeta', '4111-1111-1111-1111'],
      ['input-vencimiento', '12/28'],
      ['input-cvv', '123'],
    ]);

    // Primer intento
    await fireEvent.press(screen.getByText('Confirmar pago'));

    expect(screen.getByText('Correo electrónico inválido')).toBeTruthy();
    expect(screen.getByText('El teléfono solo permite números')).toBeTruthy();
    expect(screen.getByText('El número de tarjeta solo permite números')).toBeTruthy();

    // Corrige únicamente el correo
    await fill('input-email', 'alejandro.dussan@correo.com');

    await fireEvent.press(screen.getByText('Confirmar pago'));

    // Todavía deben existir errores
    expect(screen.queryByText('Correo electrónico inválido')).toBeNull();
    expect(screen.getByText('El teléfono solo permite números')).toBeTruthy();
    expect(screen.getByText('El número de tarjeta solo permite números')).toBeTruthy();

    // Corrige el teléfono
    await fill('input-telefono', '3105558899');

    await fireEvent.press(screen.getByText('Confirmar pago'));

    // Solo debe quedar el error de la tarjeta
    expect(screen.queryByText('El teléfono solo permite números')).toBeNull();
    expect(screen.getByText('El número de tarjeta solo permite números')).toBeTruthy();

    // Corrige la tarjeta
    await fill('input-numero-tarjeta', '4111111111111111');

    await fireEvent.press(screen.getByText('Confirmar pago'));

    await waitFor(() => {
      expect(
        screen.getByText('Transacción completada exitosamente')
      ).toBeTruthy();
    });

  });
  /**
   * Caso de prueba: INT-CHK-003
   *
   * Objetivo:
   * Verificar que el sistema impida completar la compra cuando
   * únicamente falta el CVV y permita finalizar la transacción
   * después de diligenciar ese dato.
   */
  it('INT-CHK-003 - debe completar la compra después de ingresar el CVV faltante', async () => {

    await renderScreen();

    // El usuario diligencia el formulario dejando vacío el CVV
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
      ['input-cvv', ''],
    ]);

    // Intenta completar la compra
    await fireEvent.press(screen.getByText('Confirmar pago'));

    // El sistema debe impedir continuar
    expect(
      screen.getByText('Completa todos los campos antes de continuar')
    ).toBeTruthy();

    // El usuario completa únicamente el CVV
    await fill('input-cvv', '123');

    // Intenta nuevamente
    await fireEvent.press(screen.getByText('Confirmar pago'));

    // La compra debe completarse correctamente
    await waitFor(() => {
      expect(
        screen.getByText('Transacción completada exitosamente')
      ).toBeTruthy();
    });

  });
  /**
   * Caso de prueba: INT-CHK-004
   *
   * Objetivo:
   * Verificar que el usuario pueda modificar un dato del formulario
   * antes de confirmar la compra sin afectar la información restante.
   */
  it('INT-CHK-004 - debe conservar la información al modificar únicamente la ciudad', async () => {

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

    // El usuario modifica únicamente la ciudad
    await fill('input-ciudad', 'Envigado');

    // Se valida que el resto de la información permanezca igual
    expect(screen.getByTestId('input-nombre').props.value).toBe('Alejandro Dussan');
    expect(screen.getByTestId('input-email').props.value).toBe('alejandro.dussan@correo.com');
    expect(screen.getByTestId('input-telefono').props.value).toBe('3105558899');
    expect(screen.getByTestId('input-direccion').props.value).toBe('Carrera 45 #120-35');
    expect(screen.getByTestId('input-ciudad').props.value).toBe('Envigado');

    // El usuario confirma la compra
    await fireEvent.press(screen.getByText('Confirmar pago'));

    await waitFor(() => {
      expect(
        screen.getByText('Transacción completada exitosamente')
      ).toBeTruthy();
    });

  });


});