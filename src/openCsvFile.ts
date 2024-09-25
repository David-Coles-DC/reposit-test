import * as fs from "fs";
import { parse } from 'csv-parse';
import { PropertyDetails, TenantDetails } from "./types";

async function parseCsv<T>(fileName: string, headers: string[]): Promise<T[]> {
    const records: T[] = [];
    const parser = fs.createReadStream(`${__dirname}/files/${fileName}`)
        .pipe(parse({
            delimiter: ',',
            columns: headers,
            fromLine: 2,
            cast: true
        }));
    for await (const record of parser) {
        records.push(record);
    }
    return records;
}

export function openPropertyCsv(): Promise<PropertyDetails[]> {
    const filePath = 'technical-challenge-properties-september-2024.csv';
    const headers = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    return parseCsv<PropertyDetails>(filePath, headers);
}

export function openTenantCsv(): Promise<TenantDetails[]> {
    const filePath = 'technical-challenge-tenants-september-2024.csv';
    const headers = ['id', 'propertyId', 'name'];
    return parseCsv<TenantDetails>(filePath, headers);
}