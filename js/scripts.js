'use script';

document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM CONTENT LOADED")

    const url = 'https://my.api.mockaroo.com/flight_logs.json?key=5776e910';
    const options = {method: 'GET'};

    try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    } catch (error) {
    console.error(error);
    }

    const form = document.querySelector("#flightPlanForm");
    const output = document.querySelector("#output");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Stop form from reloading the page

        const formData = new FormData(form);
        const flightPlan = {};
        for (const [key, value] of formData.entries()) {
            flightPlan[key] = value;
        }

        output.textContent = JSON.stringify(flightPlan, null, 2); // Display data nicely
    });
});