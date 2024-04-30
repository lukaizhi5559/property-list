export const extractPropertyData = (data: any): any[] => {
  return !data || typeof data !== 'object' ? [] : 
    data.map((item: any) => ({
      mlsId: item.mlsId ?? 0,
      bedrooms: item.property?.bedrooms ?? 0,
      bathsFull: item.property?.bathsFull ?? 0,
      bathsHalf: item.property?.bathsHalf ?? 0,
      area: item.property?.area ?? 0,
      listPrice: item.listPrice ?? 0,
      address: {
          crossStreet: item.address?.crossStreet ?? '',
          state: item.address?.state ?? '',
          country: item.address?.country ?? '',
          postalCode: item.address?.postalCode ?? '',
          streetName: item.address?.streetName ?? '',
          streetNumberText: item.address?.streetNumberText ?? '',
          city: item.address?.city ?? '',
          streetNumber: item.address?.streetNumber ?? '',
          full: item.address?.full ?? '',
          unit: item.address?.unit ?? '',
      },
      listDate: item.listDate ?? '',
      photos: item.photos ?? [],
      geo: {
        lat: item.geo?.lat ?? 0,
        lng: item.geo?.lng ?? 0,
      },
    })
  );
};
