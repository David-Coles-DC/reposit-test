import { PropertyDetails } from './types';
import { openPropertyCsv } from './openCsvFile';

//Obtain the average rent by region based on the user input
export async function getRentByRegion(region: string) {
    let matchedProperties: PropertyDetails[] = [];
    let average: number = 0;

    await openPropertyCsv()
        .then((data) => {
            //filter the property data by the region that the user entered
            matchedProperties = data.filter((record: PropertyDetails) => record.region.toUpperCase() == region.toUpperCase());
        });

    if (matchedProperties.length == 0) {
        //if no results match the user input
        console.error('Region does not exist');
    } else {
        //calculate the average rent and show it to the user
        average = Math.round(matchedProperties.reduce((total: number, next) => +total + +next.monthlyRentPence, 0) / matchedProperties.length) / 100;
        console.log(`Average rent for ${region} is £${average}`);
    }
    return average;
}