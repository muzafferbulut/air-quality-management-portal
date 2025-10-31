import { useState, useEffect } from "react";

const formatApiDate = (datetimeStr) => {
  if (!datetimeStr || datetimeStr.indexOf("T") === -1) {
    return null;
  }

  const [datePart, timePart] = datetimeStr.split("T");
  const [year, month, day] = datePart.split("-");
  const formattedDate = `${day}.${month}.${year}`;

  const [hour] = timePart.split(":");

  return `${formattedDate}%20${hour}:00:00`;
};

export const useLinkCreator = (stationId, rawStartDate, rawEndDate) => {
  const [apiUrl, setApiUrl] = useState(null);

  useEffect(() => {
    if (!stationId || !rawStartDate || !rawEndDate) {
      setApiUrl(null);
      return;
    }

    const sDate = formatApiDate(rawStartDate);
    const eDate = formatApiDate(rawEndDate);

    if (sDate && eDate) {
      const link = `/api/GetAQIByStationId?StationId=${stationId}&StartDate=${sDate}&EndDate=${eDate}`;
      setApiUrl(link);
    } else {
      setApiUrl(null);
    }
  }, [stationId, rawStartDate, rawEndDate]);

  return { apiUrl };
};
