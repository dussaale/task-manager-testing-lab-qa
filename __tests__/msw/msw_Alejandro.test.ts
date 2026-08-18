describe('MSW - Validación de configuración', () => {
  test('debe interceptar una petición GET usando MSW', async () => {
    const response = await fetch('https://api.taskmanager.com/tasks');

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].title).toBe('Tarea existente');
  });
});