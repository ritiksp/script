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

        document.body.addEventListener('click', logElementName);

        function logElementName(event) {
                const data = {
                    'current-domain': window.location.hostname, // Current domain
                    'device_id': deviceId, // Device ID
                    'tag_interacted': event.target.tagName // Tag interacted
                };
                sendAnalyticsData(data);
            }


            function sendAnalyticsData(data) {
                fetch('http://127.0.0.1:5000/analytics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to send analytics data');
                        }
                        console.log('Analytics data sent successfully');
                    })
                    .catch(error => {
                        console.error('Error sending analytics data:', error);
                    });
            }
