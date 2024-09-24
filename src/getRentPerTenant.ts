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
    //Creat a question for the return type input
    rl.question('Please enter 1 to return in pounds or 2 to return in pence: ', (returnValue: string) => {
        // pass the input values to the getRentPerTenant function
        getRentPerTenant(propertyId, returnValue).then(r => {
            rl.close();
        });
    });
});

//Obtain the rent per tenant based on the propertyId user input and return a value
export async function getRentPerTenant(propertyId: string, returnValue: string) {
    let matchedProperties: PropertyDetails[] = [];
    let matchedTenants: TenantDetails[] = [];
    let totalRent: number = 0;
    let rentPerTenant: number = 0;

    await openPropertyCsv()
        .then((data) => {
            matchedProperties = data.filter((record: PropertyDetails) => record.id.toUpperCase() == propertyId.toUpperCase());
        });

    if (matchedProperties.length == 0) {
        //if no results match the user input
        console.error('Property does not exist');
        return rentPerTenant;
    }

    //get the monthly rental amount
    totalRent = matchedProperties[0].monthlyRentPence;

    await openTenantCsv()
        .then((data) => {
            matchedTenants = data.filter((record: TenantDetails) => record.propertyId.toUpperCase() == propertyId.toUpperCase());
        });

    if (matchedTenants.length == 0) {
        //if no results match the user input
        console.error('There are no tenants for this property');
    } else {
        if (returnValue == '1') {
            //calculate the rent per tenant in pounds and display it to the user
            rentPerTenant = (totalRent / matchedTenants.length) / 100;
            console.log('Monthly rent per tenant is £' + rentPerTenant);
        } else if (returnValue == '2') {
            //calculate the rent per tenant in pence and display it to the user
            rentPerTenant = totalRent / matchedTenants.length;
            console.log('Monthly rent per tenant is ' + rentPerTenant + 'p');
        } else {
            //return an error when the user did not specify either 1 or 2 as the return value
            console.error('Invalid response');
        }
    }
    return rentPerTenant;
}