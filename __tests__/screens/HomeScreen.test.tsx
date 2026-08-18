import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from '../../src/screens/HomeScreen';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const metrics = {
  frame: {
    x: 0,
    y: 0,
    width: 390,
    height: 844,
  },
  insets: {
    top: 47,
    left: 0,
    right: 0,
    bottom: 34,
  },
};

const renderScreen = async () =>
  await render(
    <SafeAreaProvider initialMetrics={metrics}>
      <HomeScreen />
    </SafeAreaProvider>
  );

describe('HomeScreen', () => {
  it('muestra el título principal de la aplicación', async () => {
    const { getByText } = await renderScreen();

    expect(getByText('Task Manager')).toBeTruthy();
  });

  it('muestra el acceso al Flujo Todo List con su descripción', async () => {
    const { getByRole, getByText } = await renderScreen();

    expect(
      getByRole('button', {
        name: 'Flujo Todo List',
      })
    ).toBeTruthy();

    expect(
      getByText('Crear, completar y eliminar tareas')
    ).toBeTruthy();
  });

  it('muestra el acceso al Flujo Transaccional con su descripción', async () => {
    const { getByRole, getByText } = await renderScreen();

    expect(
      getByRole('button', {
        name: 'Flujo Transaccional',
      })
    ).toBeTruthy();

    expect(
      getByText('Datos de usuario, envío y pago')
    ).toBeTruthy();
  });
});