import { getRentByRegion } from './utils/getRentByRegion';
import * as readline from "readline";

//Create an input for the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Create a question for the region input
rl.question('Please enter a region: ', async (region: string) => {
    // pass the input value to the getRentByRegion function
    const average = await getRentByRegion(region);
    console.log(`Average rent for ${region} is £${average.toFixed(2)}`);
    rl.close();
});