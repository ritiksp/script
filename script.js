// Function to log the name of the clicked HTML element
        function logElementName(event) {
            console.log("Clicked element:", event.target.tagName);
        }

        // Add click event listener to the document body
        document.body.addEventListener('click', logElementName);

        function logKeyPressed(event) {
            console.log("Pressed key:", event.key);
        }

        // Add keydown event listener to the document body
        document.body.addEventListener('keydown', logKeyPressed);


        //User Agenr

        const platform = navigator.platform;

        console.log(platform);

        const userAgent = navigator.userAgent;

        console.log(userAgent);

        // Geo

        // fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=75e2f62b53c6441d8e8e14fcfa2a61c3`)
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('Continent:', data.continent_name);
        //     console.log('Country:', data.country_name);
        //     console.log('Region:', data.state_prov);
        //     console.log('City:', data.city);
        //     console.log('Latitude:', data.latitude);
        //     console.log('Longitude:', data.longitude);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });


        // Scroll

        // Get the height of the entire document
        const docHeight = document.documentElement.scrollHeight;

        // Define a function to handle the scroll event
        function handleScroll() {
            // Get the current scroll position
            const scrollTop = window.scrollY;

            // Calculate the scroll percentage
            const scrollPercent = (scrollTop / (docHeight - window.innerHeight)) * 100;

            // Log the scroll percentage
            console.log('Scroll Percentage:', scrollPercent.toFixed(2) + '%');

            // Check if scroll percentage is greater than or equal to 99%
            if (scrollPercent >= 99) {
                // Remove the scroll event listener
                window.removeEventListener('scroll', handleScroll);
            }
        }

        // Add a scroll event listener that calls the handleScroll function
        window.addEventListener('scroll', handleScroll);


        //Sesssion Open and Close
        // Store the session opening time when the script first runs
        const sessionStartTime = new Date();

        // Add a listener to capture session closing time when the window unloads (when the user leaves the page)
        window.addEventListener('unload', function () {
            // Store the session closing time
            const sessionEndTime = new Date();

            // Calculate the session duration in milliseconds
            const sessionDuration = sessionEndTime - sessionStartTime;

            // Convert milliseconds to minutes and seconds
            const minutes = Math.floor(sessionDuration / (1000 * 60));
            const seconds = Math.floor((sessionDuration % (1000 * 60)) / 1000);

            // Format the session closing time
            const formattedEndTime = sessionEndTime.toLocaleString();

            // Print the session opening and closing time, and duration
            console.log('Session opened at:', sessionStartTime.toLocaleString());
            console.log('Session closed at:', formattedEndTime);
            console.log('Session duration:', minutes + ' minutes and ' + seconds + ' seconds');
        });


        if (userAgent.includes("Chrome")) {
            console.log("User is using Chrome");
        } else if (userAgent.includes("Firefox")) {
            console.log("User is using Firefox");
        } else if (userAgent.includes("Safari")) {
            console.log("User is using Safari");
        } else if (userAgent.includes("Edge")) {
            console.log("User is using Edge");
        } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
            console.log("User is using Opera");
        } else {
            console.log("User browser is not identified");
        }

        //Page Speed

        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;

            // Calculate the page load time in seconds
            const pageLoadTimeInSeconds = (timing.loadEventEnd - timing.navigationStart) / 1000;

            console.log('Page load time:', pageLoadTimeInSeconds, 'seconds');
        } else {
            console.log('Navigation Timing API is not supported by the browser');
        }


        // Internet Type

        if (navigator.connection && navigator.connection.effectiveType) {
            console.log('Effective connection type:', navigator.connection.effectiveType);
        } else {
            console.log('Network Information API is not supported by the browser.');
        }


        // Generate a unique identifier if it doesn't exist
        if (!localStorage.getItem('deviceId')) {
            const deviceId = generateDeviceId();
            localStorage.setItem('deviceId', deviceId);
        }

        // Function to generate a random device ID
        function generateDeviceId() {
            // Generate a random string or use more sophisticated algorithms
            return 'device_' + Math.random().toString(36).substr(2, 9);
        }

        // Get the device ID
        const deviceId = localStorage.getItem('deviceId');
        console.log('Device ID:', deviceId);
