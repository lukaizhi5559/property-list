/**
 * Calculates the total number of baths for a property.
 * @param {number} bathsFull - The number of full baths.
 * @param {number} bathsHalf - The number of half baths.
 * @returns {number} The total number of baths.
 */
export const calculateTotalBaths = (bathsFull: number, bathsHalf: number) => {
    return bathsFull + 0.5 * bathsHalf;
};