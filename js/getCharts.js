let aqiLink =
  "https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=377e1216-bcc7-42c0-aad8-4d5b3d602b78&StartDate=11.06.2020%2000:00:00&EndDate=12.06.2020%2000:00:00";

let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");
let stationList = document.getElementById("stationList");

startDate.addEventListener("change", () => {
  let startDateV = startDate.value;
  document.getElementById("end-date").min = startDateV;
});

document.getElementById("submit-button").addEventListener("click", () => {
  let pm10Aqi = [];
  let so2Aqi = [];
  let o3Aqi = [];
  let no2Aqi = [];
  let coAqi = [];
  let aqiIndex = [];

  // start date parse
  let sDate = startDate.value.split("T")[0];
  let shour = startDate.value.split("T")[1];
  shour = shour.split(":")[0];
  let sdd = sDate.split("-");
  sDate = sdd[2] + "." + sdd[1] + "." + sdd[0] + "%20" + shour + ":00:00";

  // end date parse
  let eDate = endDate.value.split("T")[0];
  let ehour = endDate.value.split("T")[1];
  ehour = ehour.split(":")[0];
  let edd = eDate.split("-");
  eDate =
    edd[2] + "." + edd[1] + "." + edd[0] + "%20" + ehour.split(":") + ":00:00";

  //crated link and request
  let stationId = stationList.value;
  let link = `https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIByStationId?StationId=${stationId}&StartDate=${sDate}&EndDate=${eDate}`;

  // istek atılır ve grafikler çizilir.
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      
      console.log(data);

      data.forEach((element) => {
        pm10Aqi.push(element["Concentration"]["PM10"]);
        so2Aqi.push(element["Concentration"]["SO2"]);
        coAqi.push(element["Concentration"]["CO"]);
        o3Aqi.push(element["Concentration"]["O3"]);
        pm10Aqi.push(element["Concentration"]["PM10"]);
        no2Aqi.push(element["Concentration"]["NO2"]);
        aqiIndex.push(element["AQI"]["AQIIndex"]);
      });

      // seçilen tarih aralığı için dönen verinin ortalama aqi değerleri bar grafik

      // seçilen tarih aralığı için dönen verilerin etkin kirleticileri oranı için donut grafik

      // seçilen tarih aralığı için dönen verilerin aqi değişimi line grafik
    });
});
