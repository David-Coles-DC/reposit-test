import {PropertyDetails, TenantDetails} from './types';
import {openPropertyCsv, openTenantCsv} from '../openCsvFile';

//Obtain the property status based on the user input
export async function getPropertyStatus(propertyId: string, currentDate: Date = new Date()) {
    let matchedProperties: PropertyDetails[] = [];
    let matchedTenants: TenantDetails[] = [];

    await openPropertyCsv()
        .then((data: PropertyDetails[]) => {
            //filter the property data by the propertyId that the user entered
            matchedProperties = data.filter((record: PropertyDetails) => record.id.toUpperCase() == propertyId.toUpperCase());
        });

    if (matchedProperties.length === 0) {
        //if no results match the user input
        throw new Error(`No property found for ${propertyId}`);
    }

    //get the tenancy end date for the property
    let tenancyEndDate: Date = matchedProperties[0].tenancyEndDate;
    //get the capacity value for the property
    let capacity: number = matchedProperties[0].capacity;

    await openTenantCsv()
        .then((data: TenantDetails[]) => {
            //filter the tenant data by the propertyId that the user entered
            matchedTenants = data.filter((record: TenantDetails) => record.propertyId.toUpperCase() === propertyId.toUpperCase());
        });

    return matchedTenants.length === 0 ?
        //The property has no tenants
        'PROPERTY_VACANT' :
        new Date(tenancyEndDate) > currentDate ?
            //The property has at least one tenant but tenancy end date has expired
            'PROPERTY_OVERDUE' :
            capacity > matchedTenants.length ?
                //The property is not yet at capacity and the tenancy end date has not yet expired
                'PARTIALLY_VACANT' :
                //The property is at capacity and the tenancy end date has not yet expired
                'PROPERTY_ACTIVE'
}