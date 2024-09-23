# Reposit Test - David Coles
***
## Overview
Make sure you have all of the npm packages by running
```
npm install
```
***
### 1. Calculate the average rent of properties by region
run the following in the terminal or command prompt
```
npx ts-node src/getRentByRegion.ts
```
You will be prompted to enter a region, enter either of the following;
+ **England**,
+ **Wales**,
+ **Scotland** or
+ **N.Ireland**

You will then receive your answer in GBP. 
***
### 2. Calculate the monthly rent, per tenant for a given property
run the following in the terminal or command prompt
```
npx ts-node src/getRentPerTenant
```
You will be prompted to enter a property id.

At the next prompt, if you would like to receive the result in pounds enter 1, if you would like it in pence then enter 2. 

You will then receive your answer.
***
### 3. Validate the postcode of all properties
```
npx ts-node src/validatePostcodes
```
***
### 4. Get the 'status' of a property
```
npx ts-node src/getPropertyStatus
```