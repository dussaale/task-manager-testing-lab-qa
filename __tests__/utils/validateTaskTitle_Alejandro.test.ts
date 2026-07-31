import { validateTaskTitle } from '../../src/utils/validateTask';

describe(' suite Alejandro validateTaskTitle', () => {

  describe('Casos válidos', () => {

    it('debe retornar null cuando el título es válido', () => {
      const resultado = validateTaskTitle('Comprar leche');

      expect(resultado).toBeNull();
    });

  });

  describe('Casos inválidos', () => {

    it('debe retornar un mensaje de error cuando el título está vacío', () => {
      const resultado = validateTaskTitle('');

      expect(resultado).toBe('El título es obligatorio');
    });

    it('debe retornar un mensaje de error cuando el título contiene solo espacios', () => {
  const resultado = validateTaskTitle('      ');

  expect(resultado).toBe('El título es obligatorio');
});

  });

  describe('Casos límite', () => {
    it('debe retornar un error cuando el título tiene menos de 3 caracteres', () => {
  const resultado = validateTaskTitle('AB');

  expect(resultado).toBe('El título debe tener al menos 3 caracteres');
});

it('debe retornar un error cuando el título supera los 100 caracteres', () => {
  const titulo = 'A'.repeat(101);

  const resultado = validateTaskTitle(titulo);

  expect(resultado).toBe('El título no puede exceder los 100 caracteres');
});

it('debe aceptar un título con exactamente 3 caracteres', () => {

  const resultado = validateTaskTitle('ABC');

  expect(resultado).toBeNull();

});

  });

});