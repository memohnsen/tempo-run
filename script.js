function calculatePace() {
    // Retrieve and parse input values
    const milesInput = document.getElementById('miles').value.trim();
    const twoMrTimeInput = document.getElementById('2mr').value.trim();
    
    // Input Validation
    if (!milesInput || !twoMrTimeInput) {
        alert('Please enter both miles and 2MR time.');
        return;
    }

    const miles = parseFloat(milesInput);
    if (isNaN(miles) || miles <= 0) {
        alert('Please enter a valid number of miles.');
        return;
    }

    const timeParts = twoMrTimeInput.split(':');
    if (timeParts.length !== 2) {
        alert('Please enter the 2MR time in MM:SS format.');
        return;
    }

    const minutes = parseInt(timeParts[0], 10);
    const seconds = parseInt(timeParts[1], 10);

    if (isNaN(minutes) || isNaN(seconds) || seconds >= 60) {
        alert('Please enter a valid 2MR time in MM:SS format.');
        return;
    }

    // Convert 2MR input to total seconds
    const twoMrSeconds = (minutes * 60) + seconds;

    // Calculate Projected 1MR Time with Distance Factor for 1 mile (96%)
    const distanceFactor1MR = 1 + ((1 - 2) * 0.04); // For 1 mile: 0.96
    const projected1MRSeconds = (twoMrSeconds / 2) * distanceFactor1MR;

    // Calculate Distance Factor based on entered miles
    const distanceFactorRun = 1 + ((miles - 2) * 0.04);

    // Apply Intensity Factor of 85%
    const intensityFactor = 0.85;

    // Calculate Final Pace in seconds per mile
    const finalPaceSeconds = (projected1MRSeconds * distanceFactorRun) / intensityFactor;

    // Convert Final Pace to MM:SS format
    const minPerMile = Math.floor(finalPaceSeconds / 60);
    const secPerMile = Math.round(finalPaceSeconds % 60);

    // Calculate Total Run Time
    const totalRunSeconds = finalPaceSeconds * miles;
    const totalMinutes = Math.floor(totalRunSeconds / 60);
    const totalSeconds = Math.round(totalRunSeconds % 60);

    // Display the calculated results
    document.getElementById('result').innerHTML = `
        Pace: ${minPerMile} min ${secPerMile} sec per mile <br>
        Total Run Time: ${totalMinutes} min ${totalSeconds} sec
    `;
}

// Trigger the calculatePace function on "Enter" key press for both inputs
['2mr', 'miles'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculatePace();
        }
    });
});
