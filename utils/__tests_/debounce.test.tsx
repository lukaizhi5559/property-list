import debounce from '../debounce';

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('debounce', () => {
  it('calls the function after the specified wait time', () => {
    // Mock the function to be debounced
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 100);

    // Call the debounced function immediately
    debouncedFunction();
    expect(mockFunction).toHaveBeenCalledTimes(0);

    // Fast-forward time by 99ms
    jest.advanceTimersByTime(99);
    expect(mockFunction).toHaveBeenCalledTimes(0);

    // Fast-forward time by 1ms (total 100ms)
    jest.advanceTimersByTime(1);
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Call the debounced function again
    debouncedFunction();
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Fast-forward time by 99ms
    jest.advanceTimersByTime(99);
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Fast-forward time by 100ms (total 200ms)
    jest.advanceTimersByTime(100);
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });

  it('calls the function immediately if immediate is true', () => {
    // Mock the function to be debounced
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 100, true);

    // Call the debounced function immediately
    debouncedFunction();
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Fast-forward time by 99ms
    jest.advanceTimersByTime(99);
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Fast-forward time by 100ms (total 200ms)
    jest.advanceTimersByTime(1);
    expect(mockFunction).toHaveBeenCalledTimes(1);

    // Call the debounced function again
    debouncedFunction();
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
