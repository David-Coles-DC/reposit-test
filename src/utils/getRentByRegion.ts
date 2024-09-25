import { PropertyDetails } from './types';
import { openPropertyCsv } from '../openCsvFile';

//Obtain the average rent by region based on the user input
export async function getRentByRegion(region: string) {
    let matchedProperties: PropertyDetails[] = [];

    await openPropertyCsv()
        .then((data: PropertyDetails[]) => {
            //filter the property data by the region that the user entered
            matchedProperties = data.filter((record: PropertyDetails) => record.region.toUpperCase() === region.toUpperCase());
        });

    if (matchedProperties.length === 0) {
        //if no results match the user input
        throw new Error(`No properties found for ${region}`);
    } else {
        //calculate the average rent
        return matchedProperties.reduce((total, next) => total + next.monthlyRentPence, 0) / matchedProperties.length / 100;
    }
}