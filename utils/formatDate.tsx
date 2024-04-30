/**
 * Formats the date of a property listing.
 * @param {string} dateString - The date of the listing.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
};
