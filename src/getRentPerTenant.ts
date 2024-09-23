import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { PropertyDetails, TenantDetails } from './types';
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
        getRentPerTenant(propertyId, returnValue);
        rl.close();
    });
});

//Obtain the rent per tenant based on the propertyId user input and return a value
export function getRentPerTenant(propertyId: string, returnValue: string) {
    //set the values for the CSV file
    const csvFilePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    //set the headers for the CSV file
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    //open the CSV file
    const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    //set the values for the CSV file
    const csvFilePath2: string = path.resolve(__dirname, 'files/technical-challenge-tenants-september-2024.csv');
    //set the headers for the CSV file
    const headers2: string[] = ['id', 'propertyId', 'name'];
    //open the CSV file
    const fileContent2: string = fs.readFileSync(csvFilePath2, { encoding: 'utf-8' });

    let totalRent: number = 0;
    let rentPerTenant: number = 0;

    //parse the CSV file and exclude the header row
    parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        on_record: (record) => {
            //only include records where the propertyId matches the user input
            if (record.id.toUpperCase() !== propertyId.toUpperCase()) {
                return;
            }
            return record;
        },
    }, (error, result: PropertyDetails[]) => {
        if (error) {
            console.error(error);
        }
        if (result.length == 0) {
            //if no results match the user input
            console.error('Property does not exist');
            return;
        } else {
            //get the monthly rental amount
            totalRent = result[0].monthlyRentPence;
            //parse the CSV file and exclude the header row
            parse(fileContent2, {
                delimiter: ',',
                columns: headers2,
                fromLine: 2,
                on_record: (record) => {
                    //only include records where the propertyId matches the user input
                    if (record.propertyId.toUpperCase() !== propertyId.toUpperCase()) {
                        return;
                    }
                    return record;
                },
            }, (error, result: TenantDetails[]) => {
                if (error) {
                    console.error(error);
                }
                if (result.length == 0) {
                    //if no results match the user input
                    console.error('There are no tenants for this property');
                } else {
                    if (returnValue == '1') {
                        //calculate the rent per tenant in pounds and display it to the user
                        rentPerTenant = (totalRent / result.length) / 100;
                        console.log('Monthly rent per tenant is £' + rentPerTenant);
                    } else if (returnValue == '2') {
                        //calculate the rent per tenant in pence and display it to the user
                        rentPerTenant = totalRent / result.length;
                        console.log('Monthly rent per tenant is ' + rentPerTenant + 'p');
                    } else {
                        //return an error when the user did not specify either 1 or 2 as the return value
                        console.error('Invalid response');
                    }
                }
            });
        }
    });
    return rentPerTenant;
}