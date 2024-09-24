import { PropertyDetails } from './types';
import { openPropertyCsv } from './openCsvFile';

//A function to test if a postcode is valid or not, will return **true** if valid and **false** if invalid
function validPostcode(postcode: string) {
    postcode = postcode.replace(/\s/g, "");
    let regex: RegExp = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
}

//a function that will return all propertyIds where the postcode is invalid
export async function validatePostcodes() {
    let invalidPostcodes: PropertyDetails[] = [];

    await openPropertyCsv()
        .then((data) => {
            invalidPostcodes = data.filter((record: PropertyDetails) => !validPostcode(record.postcode));
        });

        if (invalidPostcodes.length == 0) {
            //all postcodes have passed as being valid
            console.log('All postcodes are valid');
        } else {
            //display a list of propertyIds where the postcode is invalid
            console.log('The following', invalidPostcodes.length, 'propertyIds have invalid postcodes');
            for (let i = 0; i < invalidPostcodes.length; i++) {
                console.log(invalidPostcodes[i].id);
            }
        }
    return invalidPostcodes;
}

validatePostcodes().then(r => {
    return
});