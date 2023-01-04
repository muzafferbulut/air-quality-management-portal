var map = L.map('map').setView([41.100072371412381,29.024512004171349], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const selectElement = document.getElementById('stationList');

fetch('https://api.ibb.gov.tr/havakalitesi/OpenDataPortalHandler/GetAQIStations')
    .then(response => response.json())
    .then(data=>{
        const stations = data.map(station => ({
            id: station.Id,
            name: station.Name
        }));

        stations.forEach(station => {
            const optionElement = document.createElement("option");
            optionElement.value = station.id;
            optionElement.textContent = station.name;
            selectElement.appendChild(optionElement);
        });

        data.forEach(station=> {
            const location = station.Location;
            const parts = location.match(/\((.*)\)/)[1].split(' ');
            const lng = parts[0];
            const lat = parts[1];
      
            L.marker([lat, lng]).addTo(map).bindPopup(station.Name);
        });

        selectElement.addEventListener('change', event => {
            const selectedId = event.target.value;
            
            const selectedStation = data.find(station => station.Id === selectedId);
      
            const selectedStationLoc = selectedStation.Location;
            const stationLocParts = selectedStationLoc.match(/\((.*)\)/)[1].split(' ');
            const stationLng = stationLocParts[0];
            const stationLat = stationLocParts[1];
      
            map.setView([stationLat, stationLng], 15);
        });
    }).catch(error=>{
        alert('Hata', error);
    });