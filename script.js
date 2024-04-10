
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


        function parseUserAgent(userAgent) {
            const ua = userAgent.toLowerCase();
            const match = /(edge|opr|chrome|safari|firefox)\/([\d.]+)/.exec(ua) || /(trident)(?:.*rv:([\w.]+))?/.exec(ua) || /(msie) ([\d.]+)/.exec(ua) || [];
            const browser = match[1] || '';
            const version = match[2] || '0';

            const os = /windows/.test(ua) ? 'Windows' : /macintosh/.test(ua) ? 'Macintosh' : /linux/.test(ua) ? 'Linux' : /android/.test(ua) ? 'Android' : /iphone|ipad|ipod/.test(ua) ? 'iOS' : 'Unknown';

            const isMobile = /mobile/.test(ua) || /android|iphone|ipad|ipod/.test(ua);

            return {
                browser: browser,
                version: version,
                os: os,
                isMobile: isMobile
            };
        }

        const userAgentString = window.navigator.userAgent;
        const userInfo = parseUserAgent(userAgentString);

        const url = 'https://ipinfo.io/?token=b4b16df10bc6bc';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const mergedInfo = {
                    Company: window.location.hostname,
                    Browser: userInfo.browser,
                    OS: userInfo.os,
                    Mobile: userInfo.isMobile,
                    IP: data.ip,
                    City: data.city,
                    Region: data.region,
                    Country: data.country,
                    Location: data.loc,
                    PostalCode: data.postal,
                    DeviceId: deviceId,
                    Timezone: data.timezone
                };
                console.log('Merged Information:', mergedInfo);
                sendDeviceData(mergedInfo);
            })
            .catch(error => console.error('Error fetching data:', error));


        function sendDeviceData(mergedInfo) {
            fetch('http://127.0.0.1:5000/device', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mergedInfo) // Corrected 'data' to 'mergedInfo'
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
