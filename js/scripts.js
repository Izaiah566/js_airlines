'use script';

const getJSON = async () => {
    const url = 'https://my.api.mockaroo.com/flight_logs.json?key=5776e910';
    const options = {method: 'GET'};

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM CONTENT LOADED")

    const airlineValue = document.querySelector("#airline");
    const form = document.querySelector('#flightPlanForm');
    const output = document.querySelector("#output");

    const myArray = await getJSON();

    const sortedArray = myArray.sort();

    sortedArray.sort((a, b) => {
        const airLineA = a.airline.toUpperCase();
        const airlineB = b.airline.toUpperCase();

        if (airLineA < airlineB) {
            return -1;
        }
        if (airLineA > airlineB) {
            return 1;
        }

        return 0;
    });
    console.log(sortedArray);

    function flightData(myArray) {
        if (!myArray || myArray.length === 0)
        {
            return "No flights found.";
        }
        
        const filteredArray = myArray.filter((flight) => {
            if (flight.airline === airlineValue.value) {
                return true;
            }
            return false;
        });

        return filteredArray.map(flight =>`
            <div class="flight">
                <h3>${flight.airline}</h3>
                <p>flight number: ${flight.flight_number}</p>
                <p>Departure Airport: ${flight.departure_airport}</p>
                <p>Arrival Airport: ${flight.arrival_airport}</p>
                <p>Departure Date: ${flight.departure_date}</p>
                <p>Arrival Date: ${flight.arrival_date}</p>
                <p>Departure Time: ${flight.departure_time}</p>
                <p>Arrival Time: ${flight.arrival_time}</p>
                <p>Flight Duration: ${flight.flight_duration}</p>
                <p>Passenger Count: ${flight.passenger_count}</p>`).join('');
    }

    

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop form from reloading the page

        output.innerHTML = flightData(myArray);
    

    });
});