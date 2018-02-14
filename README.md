# currencies
A project for code &amp; challenge that should be done in 6 hours: 

1. NodeJS:
  It should download the currencies and save it in CSV file, as long as there is no change in the currencies date.
  https://www.ecb.europa.eu/stats/eurofxref/eurofxref.zip
  There should be two accessable REST-endpoint:
  - GET /currencies/ returns all currencies
  - GET /currencies/SYMBOL returns the currency with appropriate value
  The parameters should be validated.

2. Angular:
  A frontend for the Currency service and it should cover these functionalities:
  - A Homepage: list all available currencies
  - By click a currency, it should go to a detail page and shows the actual currency value
  - A currency calculator page:
    + With the help of 2 dropdowns, the user can change the currency
    + The user can put the value of a currency on the input field
