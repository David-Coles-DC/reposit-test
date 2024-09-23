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

function validPostcode(postcode: string) {
    postcode = postcode.replace(/\s/g, "");
    let regex: RegExp = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
}

export function validatePostcodes() {
    const csvFilePath: string = path.resolve(__dirname, 'files/technical-challenge-properties-september-2024.csv');
    const headers: string[] = ['id', 'address', 'postcode', 'monthlyRentPence', 'region', 'capacity', 'tenancyEndDate'];
    const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        on_record: (record) => {
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
            console.log('All postcodes are valid');
        } else {
            console.log('The following', result.length, 'propertyIds have invalid postcodes');
            for (let i = 0; i < result.length; i++) {
                console.log(result[i].id);
            }
        }
    });
}

validatePostcodes();