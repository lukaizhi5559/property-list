export interface Property {
    geo: {
        lat: number;
        lng: number;
    };
    mlsId: number;
    bedrooms: number;
    bathsFull: number;
    bathsHalf: number;
    area: number;
    listPrice: number;
    address: {
        crossStreet: string;
        state: string;
        country: string;
        postalCode: string;
        streetName: string;
        streetNumberText: string;
        city: string;
        streetNumber: string;
        full: string;
        unit: string;
    };
    listDate: Date | string;
    photos: string[];
}
