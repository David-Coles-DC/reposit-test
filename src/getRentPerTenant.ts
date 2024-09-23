import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { PropertyDetails, TenantDetails } from './types';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Please enter a property id: ', (propertyId: string) => {
    readline.question('Please enter 1 to return in pounds or 2 to return in pence: ', (returnValue: number) => {
        getRentPerTenant(propertyId, returnValue);
        readline.close();
    });
});

export function getRentPerTenant(propertyId: string, returnValue: number) {
    const csvFilePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    const csvFilePath2: string = path.resolve(__dirname, 'files/technical-challenge-tenants-september-2024.csv');
    const headers2: string[] = ['id', 'propertyId', 'name'];
    const fileContent2: string = fs.readFileSync(csvFilePath2, { encoding: 'utf-8' });

    let totalRent: number = 0;
    let rentPerTenant: number = 0;

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
            return;
        } else {
            totalRent = result[0].monthlyRentPence;
            parse(fileContent2, {
                delimiter: ',',
                columns: headers2,
                fromLine: 2,
                on_record: (record) => {
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
                    console.error('There are no tenants for this property');
                } else {
                    if (returnValue == 1) {
                        rentPerTenant = (totalRent / result.length) / 100;
                        console.log('Monthly rent per tenant is £' + rentPerTenant);
                    } else if (returnValue == 2) {
                        rentPerTenant = totalRent / result.length;
                        console.log('Monthly rent per tenant is ' + rentPerTenant + 'p');
                    } else {
                        console.error('Invalid response');
                    }
                }
            });
        }
    });
    return rentPerTenant;
}