import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { PropertyDetails } from './types';

//Creat an input for the user
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//Creat a question for the region input
readline.question('Please enter a region? ', (region: string) => {
    // pass the input value to the getRentByRegion function
    getRentByRegion(region);
    readline.close();
});

//Obtain the average rent by region based on the user input
export function getRentByRegion(region: string) {
    //set the values for the CSV file
    const filePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    //set the headers for the CSV file
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    //open the CSV file
    const fileContent: string = fs.readFileSync(filePath, { encoding: 'utf-8' });
    let average: number = 0;

    //parse the CSV file and exclude the header row
    parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        on_record: (record) => {
            //only include records where the region matches the user input
            if (record.region.toUpperCase() !== region.toUpperCase()) {
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
            console.error('Region does not exist');
        } else {
            //calculate the average rent and show it to the user
            average = Math.round(result.reduce((total: number, next) => +total + +next.monthlyRentPence, 0) / result.length) / 100;
            console.log('Average rent for', region, 'is £' + average);
        }
    });
    return average;
}