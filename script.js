// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tempoForm');
    const milesInput = document.getElementById('miles');
    const twoMrInput = document.getElementById('2mr');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        calculatePace();
    });

    function calculatePace() {
        const milesValue = milesInput.value.trim();
        const twoMrTimeValue = twoMrInput.value.trim();

        // Input Validation
        if (!milesValue || !twoMrTimeValue) {
            alert('Please enter both distance and 2MR time.');
            return;
        }

        const miles = parseFloat(milesValue);
        if (isNaN(miles) || miles <= 0) {
            alert('Please enter a valid number of miles.');
            return;
        }

        const timeParts = twoMrTimeValue.split(':');
        if (timeParts.length !== 2) {
            alert('Please enter the 2MR time in MM:SS format.');
            return;
        }

        const minutes = parseInt(timeParts[0], 10);
        const seconds = parseInt(timeParts[1], 10);

        if (isNaN(minutes) || isNaN(seconds) || seconds >= 60 || minutes < 0 || seconds < 0) {
            alert('Please enter a valid 2MR time in MM:SS format.');
            return;
        }

        // Convert 2MR time to total seconds
        const twoMrSeconds = (minutes * 60) + seconds;

        // Calculate the base pace for 2 miles (min/mile pace)
        let basePaceSeconds = twoMrSeconds / 2;

        // Initialize adjustedPaceSeconds with the base pace
        let adjustedPaceSeconds = basePaceSeconds;

        // Calculate the distance factor only if miles are different from 2
        if (miles !== 2) {
            let distanceFactor = 1 + ((miles - 2) * 0.04);
            adjustedPaceSeconds = basePaceSeconds * distanceFactor;
        }

        // Apply the intensity factor of 85%
        let finalPaceSeconds = adjustedPaceSeconds / 0.85;

        // Convert adjusted pace into min/mile format
        let minPerMile = Math.floor(finalPaceSeconds / 60);
        let secPerMile = Math.round(finalPaceSeconds % 60);

        // Calculate total run time based on miles selected and intensity factor
        let totalRunSeconds = finalPaceSeconds * miles;
        let totalMinutes = Math.floor(totalRunSeconds / 60);
        let totalSeconds = Math.round(totalRunSeconds % 60);

        // Display the calculated results
        resultDiv.innerHTML = `
            Pace: ${minPerMile} min ${secPerMile} sec per mile <br>
            Total Run Time: ${totalMinutes} min ${totalSeconds} sec
        `;
    }

    // Allow calculation on "Enter" key press for both inputs
    [twoMrInput, milesInput].forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                calculatePace();
            }
        });
    });
});
