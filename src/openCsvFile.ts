import * as fs from "fs";
import { parse } from 'csv-parse';
import { PropertyDetails, TenantDetails } from "./types";

export async function openPropertyCsv():Promise<PropertyDetails[]> {
    //set the headers for the CSV file*/
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    let records: PropertyDetails[] = [];

    //process and parse the CSV file
    const processFile = async () => {
        const parser = fs
            .createReadStream(`${__dirname}/files/technical-challenge-properties-september-2024.csv`)
            .pipe(parse({
                delimiter: ',',
                columns: headers,
                fromLine: 2,
                cast: true
            }));
        for await (const record of parser) {
            // Work with each record
            records.push(record);
        }
    }

    await processFile();

    return records;
}

export async function openTenantCsv():Promise<TenantDetails[]> {
    //set the headers for the CSV file*/
    const headers: string[] = ['id', 'propertyId', 'name'];
    let records: TenantDetails[] = [];

    //process and parse the CSV file
    const processFile = async () => {
        const parser = fs
            .createReadStream(`${__dirname}/files/technical-challenge-tenants-september-2024.csv`)
            .pipe(parse({
                delimiter: ',',
                columns: headers,
                fromLine: 2
            }));
        for await (const record of parser) {
            // Work with each record
            records.push(record);
        }
    }

    await processFile();

    return records;
}