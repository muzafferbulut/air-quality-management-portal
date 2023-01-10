let startDate = document.getElementById("start-date");
let endDate = document.getElementById("end-date");
let stationList = document.getElementById("stationList");
let link;
let bChart;
let lChart;
let dChart;

// ortalama bulma fonksiyonu
function avgOfArray(arr) {
  let sum = 0;
  let countElement = 0;
  arr.forEach((element) => {
    if (element != null) {
      sum += element;
      countElement += 1;
    }
  });
  return sum / countElement;
}

// her event bir link
function createLink() {
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

  return link;
}

// start-date seçildiğinde end-date min değeri set edilir.
startDate.addEventListener("change", () => {
  let startDateV = startDate.value;
  document.getElementById("end-date").min = startDateV;
  link = createLink();
  getCharts();
});

// start-date seçildiğinde end-date min değeri set edilir.
endDate.addEventListener("change", () => {
  link = createLink();
  getCharts();
});

// start-date seçildiğinde end-date min değeri set edilir.
stationList.addEventListener("change", () => {
  link = createLink();
  getCharts();
});

function getCharts() {

  if(bChart){
    bChart.destroy();
  }

  let pm10Aqi = [];
  let so2Aqi= [];
  let o3Aqi = []; 
  let no2Aqi = [];
  let coAqi = [];
  let aqiIndex = [];

  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        pm10Aqi.push(element["Concentration"]["PM10"]);
        so2Aqi.push(element["Concentration"]["SO2"]);
        coAqi.push(element["Concentration"]["CO"]);
        o3Aqi.push(element["Concentration"]["O3"]);
        no2Aqi.push(element["Concentration"]["NO2"]);
        aqiIndex.push(element["AQI"]["AQIIndex"]);
      });

      // grafik 1: bu grafik her kirletici için seçilen tarih aralığında ortalama değerleri bularak bar chart çizecek

      let barChart = document.getElementById("barChart");

      bChart = new Chart(barChart, {
        type: "bar",
        data: {
          labels: ["PM10", "SO2", "O3", "NO2", "CO"],
          datasets: [
            {
              label: "Ortalama İndeks Değerleri",
              data: [avgOfArray(pm10Aqi),avgOfArray(so2Aqi), avgOfArray(coAqi), avgOfArray(o3Aqi),avgOfArray(no2Aqi)],
              borderWidth: 1
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    // grafik 2 : Etkin  kirleticilerin değişiminin line grafiği

    

}