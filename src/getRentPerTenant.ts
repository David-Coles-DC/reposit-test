import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type PropertyDetails = {
    id: string;
    address: string;
    postcode: string;
    monthlyRentPence: number;
    region: string;
    capacity: number;
    tenancyEndDate: Date;
};

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Please enter a property id: ', (propertyId: string) => {
    readline.question('Please enter 1 to return in pounds or 2 to return in pence: ', (returnValue: number) => {
        const rentPerTenant = getRentPerTenant(propertyId, returnValue);
        readline.close();
    });
});

export function getRentPerTenant(propertyId: string, returnValue: number) {
    const csvFilePath = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    const headers = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    let rentPerTenant = 0;

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        on_record: (record) => {
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
        } else {
            if (returnValue == 1) {
                rentPerTenant = (result[0].monthlyRentPence / result[0].capacity) / 100;
                console.log('Monthly rent per tenant is £' + rentPerTenant);
            } else if (returnValue == 2) {
                rentPerTenant = result[0].monthlyRentPence / result[0].capacity;
                console.log('Monthly rent per tenant is ' + rentPerTenant + 'p');
            } else {
                console.error('Invalid response');
            }
        }
    });
    return rentPerTenant;
}