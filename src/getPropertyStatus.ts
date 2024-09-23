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
    // pass the input value to the getPropertyStatus function
    getPropertyStatus(propertyId);
    rl.close();
});

//Obtain the property status based on the user input
export function getPropertyStatus(propertyId: string) {
    //set the values for the CSV file
    const filePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    //set the headers for the CSV file
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    //open the CSV file
    const fileContent: string = fs.readFileSync(filePath, { encoding: 'utf-8' });

    //set the values for the CSV file
    const filePath2: string = path.resolve(__dirname, 'files/technical-challenge-tenants-september-2024.csv');
    //set the headers for the CSV file
    const headers2: string[] = ['id', 'propertyId', 'name'];
    //open the CSV file
    const fileContent2: string = fs.readFileSync(filePath2, { encoding: 'utf-8' });

    let propertyStatus: string = '';

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
            console.error('Property does not exist');
            return;
        } else {
            //get the tenancy end date for the property
            let tenancyEndDate: Date = result[0].tenancyEndDate;
            //get the capacity value for the property
            let capacity: number = result[0].capacity;
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
                    //The property has no tenants
                    propertyStatus = 'PROPERTY_VACANT';
                } else {
                    if (new Date(tenancyEndDate) > new Date(new Date())) {
                        if (capacity > result.length) {
                            //The property is not yet at capacity and the tenancy end date has not yet expired
                            propertyStatus = 'PARTIALLY_VACANT';
                        } else {
                            //The property is at capacity and the tenancy end date has not yet expired
                            propertyStatus = 'PROPERTY_ACTIVE';
                        }
                    } else {
                        //The property has at least one tenant but tenancy end date has expired
                        propertyStatus = 'PROPERTY_OVERDUE';
                    }
                }
                console.log(propertyStatus);
            });
        }
    });
    return propertyStatus;
}