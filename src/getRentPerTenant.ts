import { getRentPerTenant } from './utils/getRentPerTenant';
import * as readline from "readline";

//Create an input for the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Create a question for the region input
rl.question('Please enter a property id: ', async (propertyId: string) => {
    //Creat a question for the return type input
    rl.question('Please enter 1 to return in pounds or 2 to return in pence: ', async (returnValue: string) => {
        // pass the input values to the getRentPerTenant function
        if (returnValue !== '1' && returnValue !== '2') {
            throw new Error(`Invalid return value ${returnValue}`);
        }
        const rentPerTenant = await getRentPerTenant(propertyId);
        if (returnValue === '1') {
            console.log(`Rent per tenant for ${propertyId} is £${(rentPerTenant / 100).toFixed(2)}`);
        } else {
            console.log(`Rent per tenant for ${propertyId} is ${rentPerTenant}p`);
        }
        rl.close();
    });
});