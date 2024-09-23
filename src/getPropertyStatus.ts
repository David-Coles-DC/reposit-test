import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { PropertyDetails, TenantDetails } from './types';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Please enter a property id: ', (propertyId: string) => {
    getPropertyStatus(propertyId);
    readline.close();
});

export function getPropertyStatus(propertyId: string) {
    const filePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    const fileContent: string = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const filePath2: string = path.resolve(__dirname, 'files/technical-challenge-tenants-september-2024.csv');
    const headers2: string[] = ['id', 'propertyId', 'name'];
    const fileContent2: string = fs.readFileSync(filePath2, { encoding: 'utf-8' });

    let propertyStatus: string = '';

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
            let tenancyEndDate: Date = result[0].tenancyEndDate;
            let capacity: number = result[0].capacity;
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
                    propertyStatus = 'PROPERTY_VACANT';
                } else {
                    if (new Date(tenancyEndDate) > new Date(new Date())) {
                        if (capacity > result.length) {
                            propertyStatus = 'PARTIALLY_VACANT';
                        } else {
                            propertyStatus = 'PROPERTY_ACTIVE';
                        }
                    } else {
                        propertyStatus = 'PROPERTY_OVERDUE';
                    }
                }
                console.log('Property status:', propertyStatus);
            });
        }
    });
    return propertyStatus;
}