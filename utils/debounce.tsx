/**
 * Creates a debounced function that delays invoking the provided function until after wait milliseconds have elapsed
 * since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {boolean} [immediate=false] - If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
 * @returns {Function} The debounced function.
 */
export const debounce = (func: Function, wait: number, immediate = false) => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    return (...args: any) => {
        const context = this;

        const later = () => {
            timeout = undefined;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

export default debounce;
