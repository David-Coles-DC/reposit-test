import { PropertyDetails, TenantDetails } from './types';
import { openPropertyCsv, openTenantCsv } from './openCsvFile';
import * as readline from "readline";

//Create an input for the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Create a question for the region input
rl.question('Please enter a property id: ', (propertyId: string) => {
    // pass the input value to the getPropertyStatus function
    getPropertyStatus(propertyId).then(r => {
        rl.close();
    });
});

//Obtain the property status based on the user input
export async function getPropertyStatus(propertyId: string) {
    let matchedProperties: PropertyDetails[] = [];
    let matchedTenants: TenantDetails[] = [];
    let propertyStatus: string = '';

    await openPropertyCsv()
        .then((data) => {
            //filter the property data by the propertyId that the user entered
            matchedProperties = data.filter((record: PropertyDetails) => record.id.toUpperCase() == propertyId.toUpperCase());
        });

    if (matchedProperties.length == 0) {
        //if no results match the user input
        console.error('Property does not exist');
        return propertyStatus;
    }

    //get the tenancy end date for the property
    let tenancyEndDate: Date = matchedProperties[0].tenancyEndDate;
    //get the capacity value for the property
    let capacity: number = matchedProperties[0].capacity;

    await openTenantCsv()
        .then((data) => {
            //filter the tenant data by the propertyId that the user entered
            matchedTenants = data.filter((record: TenantDetails) => record.propertyId.toUpperCase() == propertyId.toUpperCase());
        });

    matchedTenants.length ?
        //The property has no tenants
        propertyStatus = 'PROPERTY_VACANT'
    :
        new Date(tenancyEndDate) > new Date(new Date()) ?
            capacity > matchedTenants.length ?
                //The property is not yet at capacity and the tenancy end date has not yet expired
                propertyStatus = 'PARTIALLY_VACANT'
            :
                //The property is at capacity and the tenancy end date has not yet expired
                propertyStatus = 'PROPERTY_ACTIVE'
        :
            //The property has at least one tenant but tenancy end date has expired
            propertyStatus = 'PROPERTY_OVERDUE'

    console.log(propertyStatus);
    return propertyStatus;
}