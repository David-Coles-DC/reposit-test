import { PropertyDetails, TenantDetails } from './types';
import { openPropertyCsv, openTenantCsv } from '../openCsvFile';

//Obtain the rent per tenant based on the propertyId user input and return a value
export async function getRentPerTenant(propertyId: string) {
    let matchedProperties: PropertyDetails[] = [];
    let matchedTenants: TenantDetails[] = [];

    await openPropertyCsv()
        .then((data) => {
            //filter the property data by the propertyId that the user entered
            matchedProperties = data.filter((record: PropertyDetails) => record.id.toUpperCase() === propertyId.toUpperCase());
        });

    if (matchedProperties.length === 0) {
        //if no results match the user input
        throw new Error(`No properties found for ${propertyId}`);
    }

    //get the monthly rental amount
    const totalRent = matchedProperties[0].monthlyRentPence;

    await openTenantCsv()
        .then((data) => {
            //filter the tenant data by the propertyId that the user entered
            matchedTenants = data.filter((record: TenantDetails) => record.propertyId.toUpperCase() === propertyId.toUpperCase());
        });

    if (matchedTenants.length === 0) {
        //if no results match the user input
        throw new Error(`No tenants found for ${propertyId}`);
    }

    //calculate the rent per tenant
    return totalRent / matchedTenants.length;
}