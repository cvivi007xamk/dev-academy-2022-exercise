# Farm data exercise
Create a UI and a backend for displaying data from different farms.

Data has been received from the following farms:
* Noora's farm
* Friman Metsola collective
* Organic Ossi's Impact That Lasts plantation 
* PartialTech Research Farm

Data is received as csv-files which need to be parsed for processing.

Data format is
`[Farm name], [datetime or date],[metric type], [metric value]`

Example:
`PartialTech Research Farm,2018-12-31T22:00:00.000Z,rainFall,1.4`

The data can contain errors, so it should be validated before use.

## The exercise

Create a web application or mobile application which uses backend to fetch the data.

Backend can use a database, or it can be memory based. Real database use is preferable choice because it allows you to show broader skills.

## Backend
* CSV parsing and validation
* Endpoints to fetch data from farms with different granularities (by month, by metric)
* Input and output validation

## Frontend
* Show data in table format 
* Add filtering options 

## Validation rules
* Accept only temperature,rainfall and PH data. Other metrics should be discarded
* Discard invalid values with following rules  
* pH is a decimal value between 0 - 14
* Temperature is a celsius value between -50 and 100
* Rainfall is a positive number between 0 and 500
* Data may be missing from certain dates

