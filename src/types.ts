//Creat a type for the property CSV file
export interface PropertyDetails = {
    id: string;
    address: string;
    postcode: string;
    monthlyRentPence: number;
    region: string;
    capacity: number;
    tenancyEndDate: Date;
};

//Creat a type for the tenant CSV file
export interface TenantDetails = {
    id: string;
    propertyId: string;
    name: string;
};