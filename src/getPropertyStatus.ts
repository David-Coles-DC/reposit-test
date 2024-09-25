import { getPropertyStatus } from "./utils/getPropertyStatus";
import * as readline from "readline";

//Create an input for the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Create a question for the region input
rl.question('Please enter a property id: ', async (propertyId: string) => {
    // pass the input value to the getPropertyStatus function
    const propertyStatus = await getPropertyStatus(propertyId);
    console.log(`The property status is: ${propertyStatus}`)
    rl.close();
});