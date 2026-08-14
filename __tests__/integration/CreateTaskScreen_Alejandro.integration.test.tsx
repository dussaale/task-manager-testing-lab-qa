import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CreateTaskScreen } from '../../src/screens/CreateTaskScreen';
import { http, HttpResponse } from 'msw';
import { server } from '../../src/mocks/server';
import { appConfig } from '../../src/config/appConfig';


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

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CreateTaskScreen />
    </SafeAreaProvider>
  );

describe('CreateTaskScreen - Integración MSW (Alejandro)', () => {

beforeEach(() => {
    appConfig.useApi = true;
  });

  afterEach(() => {
    appConfig.useApi = false;
    server.resetHandlers();
  });
  /**
   * MSW-INT-001
   *
   * Verifica que el usuario pueda crear una tarea
   * utilizando el servicio interceptado por MSW.
   */
  it('MSW-INT-001 - debe crear una tarea con un título diferente al utilizado por el profesor', async () => {

    await renderScreen();

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Preparar presentación para la reunión'
    );

    await fireEvent.press(
      screen.getByText('Guardar')
    );

    await waitFor(() => {
      expect(
        screen.getByText('Tarea creada exitosamente')
      ).toBeTruthy();
    });

    expect(
      screen.getByText('Preparar presentación para la reunión')
    ).toBeTruthy();

  });

  /**
 * MSW-INT-002
 *
 * Verifica que la interfaz no muestre una tarea cuando
 * la API responde con error.
 */
it('MSW-INT-002 - no debe crear la tarea cuando la API responde con error', async () => {

  server.use(
    http.post(
      'https://api.taskmanager.com/tasks',
      () => new HttpResponse(null, { status: 500 })
    )
  );

  await renderScreen();

  await fireEvent.changeText(
    screen.getByPlaceholderText('Escribe el título de la tarea'),
    'Enviar informe mensual'
  );

  await fireEvent.press(
    screen.getByText('Guardar')
  );

  await waitFor(() => {
    expect(
      screen.queryByText('Tarea creada exitosamente')
    ).toBeNull();
  });

  expect(
    screen.queryByText('Enviar informe mensual')
  ).toBeNull();

});

/**
 * MSW-INT-003
 *
 * Verifica el comportamiento cuando la API responde
 * con una tarea que contiene datos vacíos.
 */
it('MSW-INT-003 - debe procesar una respuesta con datos vacíos enviada por MSW', async () => {

  server.use(
    http.post(
      'https://api.taskmanager.com/tasks',
      async () => {
        return HttpResponse.json(
          {
            id: '100',
            title: '',
            status: 'pending',
          },
          { status: 201 }
        );
      }
    )
  );

  await renderScreen();

  await fireEvent.changeText(
    screen.getByPlaceholderText('Escribe el título de la tarea'),
    'Tarea temporal'
  );

  await fireEvent.press(
    screen.getByText('Guardar')
  );

  await waitFor(() => {
    expect(
      screen.getByText('Tarea creada exitosamente')
    ).toBeTruthy();
  });

  // La tarea enviada por la API tiene el título vacío,
  // por lo tanto NO debe aparecer el texto ingresado por el usuario.
  expect(
    screen.queryByText('Tarea temporal')
  ).toBeNull();

});

});