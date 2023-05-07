import axios from "axios";

const map = L.map("map").setView([0, 0], 2);
const issIcon = L.icon({
  iconUrl: "./assets/iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const titleUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(titleUrl, { attribution });
tiles.addTo(map);

let firstTime = true;
async function getISS() {
  const res = await axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(({ data }) => {
    return { lat: data.latitude, lon: data.longitude };
  });

  if (firstTime) {
    map.setView([res.lat, res.lon], 4);
    firstTime = false;
  }
  marker.setLatLng([res.lat, res.lon]);

  document.querySelector("[data-lat]").innerHTML = res.lat.toFixed(7);
  document.querySelector("[data-long]").innerHTML = res.lon.toFixed(7);
}

document.addEventListener("DOMContentLoaded", () => {
  //making a map and tiles
  //fetches the iss location and updates everywhere second
});

setInterval(getISS, 1000);
