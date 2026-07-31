import { renderHook, act } from '@testing-library/react-native';
import { useCounter } from '../../src/hooks/useCounter';

describe('Suite de pruebas de Alejandro - useCounter', () => {

  it('debe iniciar el contador en cero cuando no se proporciona un valor inicial', async () => {

    const { result } = await renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

  });

  it('debe iniciar el contador con el valor inicial proporcionado', async () => {

    const { result } = await renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);

  });

  it('debe incrementar el contador correctamente', async () => {

    const { result } = await renderHook(() => useCounter());

    await act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);

  });

  it('debe decrementar el contador correctamente', async () => {

    const { result } = await renderHook(() => useCounter(5));

    await act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);

  });

  it('debe restablecer el contador al valor inicial', async () => {

    const { result } = await renderHook(() => useCounter(8));

    await act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(10);

    await act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(8);

  });

});
