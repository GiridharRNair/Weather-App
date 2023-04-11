import React, { useState, useEffect } from 'react';

function TimeZoneClock({ lat, lon }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${Date.now() / 1000}&key=${apiKey}`;

        const tick = setInterval(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
            const localTime = new Date(Date.now() + (data.rawOffset + data.dstOffset + 18000) * 1000);
            setTime(localTime);
            })
            .catch(error => console.error(error));
        }, 1000);

        return () => {
            clearInterval(tick);
        };
    }, [lat, lon]);

  return (
    <div>
      <p>{time.toLocaleString()}</p>
    </div>
  );
}

export default TimeZoneClock;
