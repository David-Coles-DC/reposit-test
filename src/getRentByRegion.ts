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

readline.question('Please enter a region? ', (region: string) => {
    if (['ENGLAND', 'WALES', 'SCOTLAND', 'N.IRELAND'].contains(region.toUpperCase())) {
        const averageRent = getRentByRegion(region);
        console.log(averageRent);
    } else {
        console.log('Region does not exist');
    }
    readline.close();
});

export function getRentByRegion(region: string) {
    const csvFilePath = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    const headers = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        on_record: (record) => {
            if (record.region.toUpperCase() !== region.toUpperCase()) {
                return;
            }
            return record;
        },
    }, (error, result: PropertyDetails[]) => {
        if (error) {
            console.error(error);
        }
        let average = Math.round(result.reduce((total: number, next) => +total + +next.monthlyRentPence, 0) / result.length) / 100;
        console.log("Average rent for", region, "is £" + average);
    });
    return region;
}