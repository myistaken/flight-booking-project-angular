# Flight Search Project

## Overview
This project provides a simple representation of flight data, allowing users to search for flights between different airports. The data includes details such as departure and arrival airports, dates, durations, prices, and airline information.

## Data Structure
The flight data is organized in a JSON format with two main sections: "flights" and "airports."

### Flights
Each flight object includes the following fields:
- `id`: Unique identifier for the flight.
- `departureAirport`: Three-letter code for the departure airport.
- `arrivalAirport`: Three-letter code for the arrival airport.
- `departureDate`: UTC timestamp for the departure date and time.
- `returnDate`: UTC timestamp for the return date and time.
- `duration`: Duration of the flight in minutes.
- `price`: Cost of the flight.
- `airline`: Airline providing the flight service.

### Airports
The airport data includes details about various airports, such as their identifier, three-letter code, and name.

## Requirements
To run and develop this project, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [npm](https://www.npmjs.com/): Package manager for Node.js (included with Node.js).
- [Angular CLI](https://angular.io/cli): Command-line interface for Angular applications.
- [json-server](https://github.com/typicode/json-server): A simple JSON server to mock API responses.

## Usage
This project can be used as a starting point for implementing a flight search feature in an application. Developers can utilize the provided flight data to build a user interface for searching and displaying flight information.

## Getting Started
1. Clone the repository: `git clone <repository-url>`
2. Install project dependencies: `npm install`
3. Start the JSON server and frontend simultaneously: `npm run server:all`
   - This command uses `concurrently` to run both the JSON server (`json-server server/db.json`) and the Angular application (`ng serve`) concurrently.

4. Explore the provided flight data in the `data.json` file.
5. Customize the data or integrate it into your application as needed.

## License
This project is licensed under the [MIT License](LICENSE).

Feel free to modify and expand this README to provide more specific information about your project and its setup.
