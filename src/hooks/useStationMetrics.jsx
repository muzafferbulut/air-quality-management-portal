import { useState, useEffect } from "react";

const avgOfArray = (arr) => {
  let sum = 0;
  let countElement = 0;
  arr.forEach((element) => {
    if (element != null) {
      sum += element;
      countElement += 1;
    }
  });
  return countElement > 0 ? sum / countElement : 0;
};

export const useStationMetrics = (apiUrl) => {
  const [metrics, setMetrics] = useState(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [errorMetrics, setErrorMetrics] = useState(null);

  useEffect(() => {
    if (!apiUrl) {
      setMetrics(null);
      return;
    }

    setIsLoadingMetrics(true);
    setErrorMetrics(null);

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        let pm10Aqi = [];
        let so2Aqi = [];
        let o3Aqi = [];
        let no2Aqi = [];
        let coAqi = [];
        let aqiIndex = [];
        let readTime = [];

        let counts = { PM10: 0, SO2: 0, CO: 0, O3: 0, NO2: 0 };

        data.forEach((element) => {
          pm10Aqi.push(element["Concentration"]["PM10"]);
          so2Aqi.push(element["Concentration"]["SO2"]);
          coAqi.push(element["Concentration"]["CO"]);
          o3Aqi.push(element["Concentration"]["O3"]);
          no2Aqi.push(element["Concentration"]["NO2"]);
          aqiIndex.push(element["AQI"]["AQIIndex"]);
          readTime.push(element["ReadTime"]);

          const contaminant = element["AQI"]["ContaminantParameter"];
          if (counts.hasOwnProperty(contaminant)) {
            counts[contaminant] += 1;
          }
        });

        setMetrics({
          // Grafik 1 (Bar Chart) için ortalamalar
          averageMetrics: [
            avgOfArray(pm10Aqi),
            avgOfArray(so2Aqi),
            avgOfArray(coAqi),
            avgOfArray(o3Aqi),
            avgOfArray(no2Aqi),
          ],
          // Grafik 2 (Doughnut Chart) için etkin kirletici oranları
          contaminantCounts: [
            counts.PM10,
            counts.SO2,
            counts.O3,
            counts.NO2,
            counts.CO,
          ],
          // Grafik 3 (Line Chart) için zaman serisi verileri
          timeSeries: {
            labels: readTime,
            aqiIndex: aqiIndex,
          },
        });
      } catch (error) {
        setErrorMetrics(error);
        setMetrics(null);
      } finally {
        setIsLoadingMetrics(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { metrics, isLoadingMetrics, errorMetrics };
};
