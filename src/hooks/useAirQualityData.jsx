import { useState, useEffect } from "react";

export const useAirQualityData = () => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/api/GetAQIStations");

        const data = await response.json();

        const cleanStations = data
          .map((station) => {
            const location = station.Location;
            const parts = location.match(/\((.*)\)/);
            if (parts && parts[1]) {
              const [lng, lat] = parts[1].split(" ");
              return {
                id: station.Id,
                name: station.Name,
                position: [parseFloat(lat), parseFloat(lng)],
              };
            }
            return null;
          })
          .filter((s) => s !== null);

        setStations(cleanStations);
      } catch (err) {
        console.error("İstasyon verisi çekilirken hata oluştu:", err);
        setError(err);
      } finally {
        setIsLoading(false)
      }
    };

    fetchStations();
  }, []);

  return { stations, isLoading, error };
};
