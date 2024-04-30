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
