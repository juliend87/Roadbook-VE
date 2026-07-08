let carteInstance = null;

async function afficherCarte() {

  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  if (carteInstance) {
    carteInstance.remove();
    carteInstance = null;
  }

  carteInstance = L.map("map").setView([44.5, -1.5], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(carteInstance);

  const groupe = L.featureGroup().addTo(carteInstance);

  for (const troncon of mission.troncons) {

    const departCoord = await pointVersCoordonnees(
      troncon.depart,
      gpsBorneOuAdresse(troncon.depart)
    );

    const arriveeCoord = await pointVersCoordonnees(
      troncon.arrivee,
      gpsBorneOuAdresse(troncon.arrivee)
    );

    L.marker([departCoord[1], departCoord[0]])
      .addTo(groupe)
      .bindPopup("Départ : " + troncon.depart);

    L.marker([arriveeCoord[1], arriveeCoord[0]])
      .addTo(groupe)
      .bindPopup("Arrivée : " + troncon.arrivee);

const body = {
  coordinates: mission.modeEspagne === "sansPeage"
    ? [
        departCoord,
        [-2.1617219287665037, 43.06937680926631],
        [-2.2297486854261357, 42.9524394864427],
        arriveeCoord
      ]
    : [
        departCoord,
        arriveeCoord
      ]
};

    if (troncon.route === "sans-peage") {
      body.options = {
        avoid_features: ["tollways"]
      };
    }

    const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {
      method: "POST",
      headers: {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    L.geoJSON(data, {
      style: {
        weight: 5
      }
    }).addTo(groupe);
  }

  carteInstance.fitBounds(groupe.getBounds(), {
    padding: [30, 30]
  });
}

function ouvrirGoogleMaps() {

  const depart = encodeURIComponent(mission.depart);
  const arrivee = encodeURIComponent(mission.arrivee);

  const url =
    `https://www.google.com/maps/dir/?api=1&origin=${depart}&destination=${arrivee}&travelmode=driving`;

  window.open(url, "_blank");
}