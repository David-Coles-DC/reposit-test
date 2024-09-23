import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { PropertyDetails } from './types';

//A function to test if a postcode is valid or not, will return **true** if valid and **false** if invalid
function validPostcode(postcode: string) {
    postcode = postcode.replace(/\s/g, "");
    let regex: RegExp = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
}

//a function that will return all propertyIds where the postcode is invalid
export function validatePostcodes() {
    //set the values for the CSV file
    const csvFilePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    //set the headers for the CSV file
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    //open the CSV file
    const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    let invalidPostcodes: PropertyDetails[] = [];

    //parse the CSV file and exclude the header row
    parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        on_record: (record) => {
            //only include records where the postcode is invalid
            if (validPostcode(record.postcode)) {
                return;
            }
            return record;
        },
    }, (error, result: PropertyDetails[]) => {
        if (error) {
            console.error(error);
        }
        if (result.length == 0) {
            //all postcodes have passed as being valid
            console.log('All postcodes are valid');
        } else {
            //display a list of propertyIds where the postcode is invalid
            console.log('The following', result.length, 'propertyIds have invalid postcodes');
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].id);
            }
            invalidPostcodes = [...result];
        }
    });
    return invalidPostcodes;
}

validatePostcodes();