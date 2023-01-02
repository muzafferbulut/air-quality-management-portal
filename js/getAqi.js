let aqiLink = 'https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=377e1216-bcc7-42c0-aad8-4d5b3d602b78&StartDate=11.06.2020%2000:00:00&EndDate=12.06.2020%2000:00:00';

fetch(aqiLink).then(respose=> Response.json()).then(
    (data)=> console.log(data));